import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramPostCommentRepository } from "@/repositories/InstagramPostCommentRepository";
import { InstagramPostRepository } from "@/repositories/InstagramPostRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface InstagramCommentsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class InstagramCommentsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private instagramCommentsRepository: InstagramPostCommentRepository,
		private gptRepository: GptRepository,
		private instagramPostRepository: InstagramPostRepository,
	) {}

	async execute({
		records,
	}: InstagramCommentsWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3InstagramCommentsNotification({
				records,
			});

		const commentExists = await this.instagramCommentsRepository.commentExists(
			data.map((item) => item.id),
		);

		const analysisFilter = data.filter(
			(item) => !commentExists.includes(item.id),
		);

		const postExists = await this.instagramPostRepository.existsByUrl(
			analysisFilter.map((item) => item.post_id),
		);

		const gptAnalysis = await this.gptRepository.commentAnalysis(
			analysisFilter.filter((item) => postExists.includes(item.post_id)),
		);

		const createData: InstagramCommentCreateInterface[] = [];

		for (const item of data) {
			const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
			if (analysis) {
				createData.push({
					...item,
					...analysis,
				});
			}
		}

		await this.instagramCommentsRepository.createMany(createData);
		return;
	}
}
