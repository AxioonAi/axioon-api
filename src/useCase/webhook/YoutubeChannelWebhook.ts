import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { YoutubeBaseDataRepository } from "@/repositories/YoutubeBaseDataRepository";

interface YoutubeChannelWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface YoutubeChannelWebhookUseCaseResponse {}

export class YoutubeChannelWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private youtubeBaseDataRepository: YoutubeBaseDataRepository
  ) {}

  async execute({
    records,
  }: YoutubeChannelWebhookUseCaseRequest): Promise<YoutubeChannelWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3YoutubeChannelNotification({
        records,
      });

    await this.youtubeBaseDataRepository.createMany(data);

    return data;
  }
}
