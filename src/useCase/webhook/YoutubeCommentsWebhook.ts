import { YoutubeCommentCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { YoutubeCommentsRepository } from "@/repositories/YoutubeCommentRepository";
import { YoutubeVideoDataRepository } from "@/repositories/YoutubeVideoDataRepository";
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
		private youtubeVideoRepository: YoutubeVideoDataRepository,
	) {}

	async execute({
		records,
	}: YoutubeCommentsWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3YoutubeCommentsNotification({
				records,
			});

		const commentExists = await this.youtubeCommentsRepository.commentExists(
			data.map((item) => item.id),
		);

		console.log(commentExists[0]);

		const analysisFilter = data.filter(
			(item) => !commentExists.includes(item.id),
		);

		console.log(analysisFilter.length);
		const videoExists = await this.youtubeVideoRepository.videoExists(
			analysisFilter.map((item) => item.video_id),
		);

		const gptAnalysis = await this.gptRepository.commentAnalysis(
			analysisFilter.filter((item) => videoExists.includes(item.video_id)),
		);

		console.log(gptAnalysis);

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
