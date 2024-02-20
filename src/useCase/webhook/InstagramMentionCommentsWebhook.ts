import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramMentionCommentRepository } from "@/repositories/InstagramMentionCommentRepository";
import { InstagramMentionRepository } from "@/repositories/InstagramMentionRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface InstagramMentionCommentsWebhookUseCaseRequest {
	records: string;
}

export class InstagramMentionCommentsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private instagramMentionCommentsRepository: InstagramMentionCommentRepository,
		private gptRepository: GptRepository,
		private instagramMentionRepository: InstagramMentionRepository,
	) {}

	async execute({
		records,
	}: InstagramMentionCommentsWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3InstagramCommentsNotification({
				records,
			});

		const commentExists =
			await this.instagramMentionCommentsRepository.commentExists(
				data.map((item) => item.id),
			);

		const analysisFilter = data.filter(
			(item) => !commentExists.includes(item.id),
		);


		const mentionExists =
			await this.instagramMentionRepository.mentionExistsByUrls(
				analysisFilter.map((item) => item.post_id),
			);



			console.time("time")
		const gptAnalysis = await this.gptRepository.commentAnalysis(
			analysisFilter.filter((item) => mentionExists.includes(item.post_id)),
		);

		console.timeEnd("time")

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

		await this.instagramMentionCommentsRepository.createMany(createData);
		return;
	}
}
