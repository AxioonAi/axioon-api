import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { NotificationRepository } from "@/repositories/NotificationRepository";
import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";
import { YoutubeBaseDataRepository } from "@/repositories/YoutubeBaseDataRepository";
import { NotificationType } from "@prisma/client";

interface YoutubeChannelWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class YoutubeChannelWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private youtubeBaseDataRepository: YoutubeBaseDataRepository,
		private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository,
		private notificationRepository: NotificationRepository,
	) {}

	async execute({
		records,
	}: YoutubeChannelWebhookUseCaseRequest): Promise<void> {
		const data =
			await this.awsNotificationRepository.S3YoutubeChannelNotification({
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
				description: `O(a) Candidato(a) ${user.politicianProfile.social_name} recebeu uma atualização nos dados do Youtube`,
			};
		});

		await this.youtubeBaseDataRepository.createMany(data);
		await this.notificationRepository.createMany(notifications);

		return;
	}
}
