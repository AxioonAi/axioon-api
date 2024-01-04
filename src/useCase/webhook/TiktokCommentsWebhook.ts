import { TiktokCommentsCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { TiktokCommentDataRepository } from "@/repositories/TiktokCommentDataRepository";
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
	) {}

	async execute({
		records,
	}: TiktokCommentsWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3TiktokCommentsNotification({
				records,
			});

		const gptAnalysis = await this.gptRepository.commentAnalysis(data);

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
