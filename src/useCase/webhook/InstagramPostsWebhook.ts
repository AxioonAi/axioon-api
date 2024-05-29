import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramPostRepository } from "@/repositories/InstagramPostRepository";

interface InstagramPostsWebhookUseCaseRequest {
  records: string;
}

export class InstagramPostsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramPostRepository: InstagramPostRepository
  ) {}

  async execute({
    records,
  }: InstagramPostsWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3InstagramPostNotification({
        records,
      });

    await this.instagramPostRepository.createMany(data);

    return;
  }
}
