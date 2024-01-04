import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { YoutubeVideoDataRepository } from "@/repositories/YoutubeVideoDataRepository";

interface YoutubeWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

interface YoutubeWebhookUseCaseResponse {}

export class YoutubeWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private youtubeVideoBaseDataRepository: YoutubeVideoDataRepository,
	) {}

	async execute({
		records,
	}: YoutubeWebhookUseCaseRequest): Promise<YoutubeWebhookUseCaseResponse> {
		const data =
			await this.awsNotificationRepository.S3YoutubeVideoNotification({
				records,
			});

		await this.youtubeVideoBaseDataRepository.createMany(data);

		return {};
	}
}
