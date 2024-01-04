import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramPostRepository } from "@/repositories/InstagramPostRepository";

interface InstagramPostsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

interface InstagramPostsWebhookUseCaseResponse {}

export class InstagramPostsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private instagramPostRepository: InstagramPostRepository,
	) {}

	async execute({
		records,
	}: InstagramPostsWebhookUseCaseRequest): Promise<InstagramPostsWebhookUseCaseResponse> {
		const data =
			await this.awsNotificationRepository.S3InstagramPostNotification({
				records,
			});

		await this.instagramPostRepository.createMany(data);

		return data;
	}
}
