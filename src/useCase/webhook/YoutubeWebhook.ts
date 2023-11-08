import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";

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
    private awsNotificationRepository: AwsNotificationProductionRepository
  ) {}

  async execute({
    records,
  }: YoutubeWebhookUseCaseRequest): Promise<YoutubeWebhookUseCaseResponse> {
    const data = await this.awsNotificationRepository.S3YoutubeNotification({
      records,
    });

    return data;
  }
}
