import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramBaseDataRepository } from "@/repositories/InstagramBaseDataRepository";
import { NotificationRepository } from "@/repositories/NotificationRepository";
import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";
import { NotificationType } from "@prisma/client";

interface InstagramProfileWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class InstagramProfileWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private instagramBaseDataRepository: InstagramBaseDataRepository,
		private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository,
		private notificationRepository: NotificationRepository,
	) {}

	async execute({
		records,
	}: InstagramProfileWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3InstagramProfileNotification({
				records,
			});

		const ids = data.map((item) => item.politician_id);

		const users =
			await this.politicianProfileMonitoringRepository.findUsersByProfileId(
				ids,
			);

		const notifications = users.map((user) => {
			return {
				user_id: user.user_id,
				politician_profile_id: user.politician_profile_id,
				type: NotificationType.INSTAGRAM,
				description: `O(a) Candidato(a) ${user.politicianProfile.social_name} recebeu uma atualização nos dados do instagram`,
			};
		});

		await this.notificationRepository.createMany(notifications);
		await this.instagramBaseDataRepository.createMany(data);

		return;
	}
}
