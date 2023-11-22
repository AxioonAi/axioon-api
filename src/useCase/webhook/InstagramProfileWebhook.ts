import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramBaseDataRepository } from "@/repositories/InstagramBaseDataRepository";

interface InstagramProfileWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface InstagramProfileWebhookUseCaseResponse {}

export class InstagramProfileWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramBaseDataRepository: InstagramBaseDataRepository
  ) {}

  async execute({
    records,
  }: InstagramProfileWebhookUseCaseRequest): Promise<InstagramProfileWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3InstagramProfileNotification({
        records,
      });

    await this.instagramBaseDataRepository.createMany(data);

    return data;
  }
}
