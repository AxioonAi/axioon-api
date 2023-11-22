import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { FacebookBaseDataRepository } from "@/repositories/FacebookBaseDataRepository";

interface FacebookProfileWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface FacebookProfileWebhookUseCaseResponse {}

export class FacebookProfileWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private facebookBaseDataRepository: FacebookBaseDataRepository
  ) {}

  async execute({
    records,
  }: FacebookProfileWebhookUseCaseRequest): Promise<FacebookProfileWebhookUseCaseResponse> {
    const response =
      await this.awsNotificationRepository.S3FacebookProfileNotification({
        records,
      });

    await this.facebookBaseDataRepository.createMany(response);

    return {};
  }
}
