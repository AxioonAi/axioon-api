import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { LegalDataRepository } from "@/repositories/LegalDataRepository";
import { NotificationRepository } from "@/repositories/NotificationRepository";

interface LegalWebhookUseCaseRequest {
	records: string;
}

export class LegalWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private notificationRepository: NotificationRepository,
		private LegalDataRepository: LegalDataRepository,
	) {}

	async execute({ records }: LegalWebhookUseCaseRequest): Promise<void> {
		const data = await this.awsNotificationRepository.S3LegalNotification({
			records,
		});

		await this.LegalDataRepository.createMany(data);

		return 
	}
}
