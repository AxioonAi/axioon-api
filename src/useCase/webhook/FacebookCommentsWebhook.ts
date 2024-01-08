import { FacebookPostCommentsCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { FacebookPostCommentsRepository } from "@/repositories/FacebookPostCommentsRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface FacebookCommentsWebhookUseCaseRequest {
	records: string;
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

		const commentExists = await this.facebookCommentsRepository.commentExists(
			data.map((item) => item.id),
		);

		const analysisFilter = data.filter(
			(item) => !commentExists.includes(item.id),
		);

		const gptAnalysis =
			await this.gptRepository.commentAnalysis(analysisFilter);

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
