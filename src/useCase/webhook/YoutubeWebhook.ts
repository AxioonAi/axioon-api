import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { YoutubeBaseDataRepository } from "@/repositories/YoutubeBaseDataRepository";
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
    private awsNotificationRepository: AwsNotificationProductionRepository,
    private youtubeBaseDataRepository: YoutubeBaseDataRepository,
    private youtubeVideoBaseDataRepository: YoutubeVideoDataRepository
  ) {}

  async execute({
    records,
  }: YoutubeWebhookUseCaseRequest): Promise<YoutubeWebhookUseCaseResponse> {
    const data = await this.awsNotificationRepository.S3YoutubeNotification({
      records,
    });

    await Promise.all([
      this.youtubeBaseDataRepository.createMany(data),
      this.youtubeVideoBaseDataRepository.createMany(data),
    ]);

    return {};
  }
}
