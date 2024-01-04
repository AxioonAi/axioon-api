import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { FacebookPostBaseDataRepository } from "@/repositories/FacebookPostBaseDataRepository";

interface FacebookPostsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

interface FacebookPostsWebhookUseCaseResponse {}

export class FacebookPostsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private facebookPostBaseDataRepository: FacebookPostBaseDataRepository,
	) {}

	async execute({
		records,
	}: FacebookPostsWebhookUseCaseRequest): Promise<FacebookPostsWebhookUseCaseResponse> {
		const data =
			await this.awsNotificationRepository.S3FacebookPostNotification({
				records,
			});

		await this.facebookPostBaseDataRepository.createMany(data);

		return data;
	}
}
