import { YoutubeCommentCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { YoutubeCommentsRepository } from "@/repositories/YoutubeCommentRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface YoutubeCommentsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class YoutubeCommentsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private youtubeCommentsRepository: YoutubeCommentsRepository,
		private gptRepository: GptRepository,
	) {}

	async execute({
		records,
	}: YoutubeCommentsWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3YoutubeCommentsNotification({
				records,
			});

		const gptAnalysis = await this.gptRepository.commentAnalysis(data);

		const createData: YoutubeCommentCreateInterface[] = [];

		for (const item of data) {
			const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
			if (analysis) {
				createData.push({
					...item,
					...analysis,
				});
			}
		}

		await this.youtubeCommentsRepository.createMany(createData);
		return;
	}
}
