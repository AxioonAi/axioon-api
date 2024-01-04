import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { NotificationRepository } from "@/repositories/NotificationRepository";
import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";
import { TiktokBaseDataRepository } from "@/repositories/TiktokBaseDataRepository";
import { TiktokVideoDataRepository } from "@/repositories/TiktokVideoDataRepository";
import { NotificationType } from "@prisma/client";

interface TiktokProfileWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

interface TiktokProfileWebhookUseCaseResponse {}

export class TiktokProfileWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private tiktokBaseDataRepository: TiktokBaseDataRepository,
		private tiktokVideoDataRepository: TiktokVideoDataRepository,
		private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository,
		private notificationRepository: NotificationRepository,
	) {}

	async execute({
		records,
	}: TiktokProfileWebhookUseCaseRequest): Promise<TiktokProfileWebhookUseCaseResponse> {
		const data =
			await this.awsNotificationRepository.S3TiktokProfileNotification({
				records,
			});

		const ids = data.profileData.map((item) => item.politician_id);

		const users =
			await this.politicianProfileMonitoringRepository.findUsersByProfileId(
				ids,
			);

		const notifications = users.map((user) => {
			return {
				user_id: user.user_id,
				politician_profile_id: user.politician_profile_id,
				type: NotificationType.INSTAGRAM,
				description: `O(a) Candidato(a) ${user.politicianProfile.social_name} recebeu uma atualização nos dados do Tiktok`,
			};
		});

		await Promise.all([
			this.tiktokBaseDataRepository.createMany(data.profileData),
			this.tiktokVideoDataRepository.createMany(data.videoData),
			this.notificationRepository.createMany(notifications),
		]);

		return data;
	}
}
