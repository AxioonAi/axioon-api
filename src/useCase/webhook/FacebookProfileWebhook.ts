import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { FacebookBaseDataRepository } from "@/repositories/FacebookBaseDataRepository";
import { NotificationRepository } from "@/repositories/NotificationRepository";
import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";
import { NotificationType } from "@prisma/client";

interface FacebookProfileWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class FacebookProfileWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private facebookBaseDataRepository: FacebookBaseDataRepository,
		private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository,
		private notificationRepository: NotificationRepository,
	) {}

	async execute({
		records,
	}: FacebookProfileWebhookUseCaseRequest): Promise<void> {
		const response =
			await this.awsNotificationRepository.S3FacebookProfileNotification({
				records,
			});

		const ids = response.map((item) => item.politician_id);

		const users =
			await this.politicianProfileMonitoringRepository.findUsersByProfileId(
				ids,
			);

		const notifications = users.map((user) => {
			return {
				user_id: user.user_id,
				politician_profile_id: user.politician_profile_id,
				type: NotificationType.INSTAGRAM,
				description: `O(a) Candidato(a) ${user.politicianProfile.social_name} recebeu uma atualização nos dados do Facebook`,
			};
		});

		await this.notificationRepository.createMany(notifications);

		await this.facebookBaseDataRepository.createMany(response);

		return;
	}
}
