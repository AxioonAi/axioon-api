import { TiktokCommentsCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { TiktokCommentDataRepository } from "@/repositories/TiktokCommentDataRepository";
import { TiktokVideoDataRepository } from "@/repositories/TiktokVideoDataRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface TiktokCommentsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class TiktokCommentsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private tiktokCommentsRepository: TiktokCommentDataRepository,
		private gptRepository: GptRepository,
		private tiktokVideoDataRepository: TiktokVideoDataRepository,
	) {}

	async execute({
		records,
	}: TiktokCommentsWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3TiktokCommentsNotification({
				records,
			});

		const commentExists = await this.tiktokCommentsRepository.commentExists(
			data.map((item) => item.id),
		);

		console.log(commentExists[0]);

		const analysisFilter = data.filter(
			(item) => !commentExists.includes(item.id),
		);

		const videoExists = await this.tiktokVideoDataRepository.videoExists(
			analysisFilter.map((item) => item.video_id),
		);

		const gptAnalysis = await this.gptRepository.commentAnalysis(
			analysisFilter.filter((item) => videoExists.includes(item.video_id)),
		);

		const createData: TiktokCommentsCreateInterface[] = [];

		for (const item of data) {
			const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
			if (analysis) {
				createData.push({
					...item,
					...analysis,
				});
			}
		}

		await this.tiktokCommentsRepository.createMany(createData);

		return;
	}
}
