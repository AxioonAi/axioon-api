import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { FacebookBaseDataRepository } from "@/repositories/FacebookBaseDataRepository";

interface FacebookWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface FacebookWebhookUseCaseResponse {}

export class FacebookWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private facebookBaseDataRepository: FacebookBaseDataRepository
  ) {}

  async execute({
    records,
  }: FacebookWebhookUseCaseRequest): Promise<FacebookWebhookUseCaseResponse> {
    const response =
      await this.awsNotificationRepository.S3FacebookNotification({ records });

    await this.facebookBaseDataRepository.createMany(response);

    return {};
  }
}
