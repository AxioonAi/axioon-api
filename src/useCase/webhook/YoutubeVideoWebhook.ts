import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { YoutubeVideoDataRepository } from "@/repositories/YoutubeVideoDataRepository";

interface YoutubeWebhookUseCaseRequest {
  records: string;
}

export class YoutubeWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private youtubeVideoBaseDataRepository: YoutubeVideoDataRepository
  ) {}

  async execute({ records }: YoutubeWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3YoutubeVideoNotification({
        records,
      });

    await this.youtubeVideoBaseDataRepository.createMany(data);

    return;
  }
}
