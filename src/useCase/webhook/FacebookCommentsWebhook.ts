import { FacebookPostCommentsCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { FacebookPostCommentsRepository } from "@/repositories/FacebookPostCommentsRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface FacebookCommentsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class FacebookCommentsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private facebookCommentsRepository: FacebookPostCommentsRepository,
		private gptRepository: GptRepository,
	) {}

	async execute({
		records,
	}: FacebookCommentsWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3FacebookCommentsNotification({
				records,
			});

		const gptAnalysis = await this.gptRepository.commentAnalysis(data);

		const createData: FacebookPostCommentsCreateInterface[] = [];

		for (const item of data) {
			const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
			if (analysis) {
				createData.push({
					...item,
					...analysis,
				});
			}
		}

		await this.facebookCommentsRepository.createMany(createData);

		return;
	}
}
