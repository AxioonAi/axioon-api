import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";

interface TiktokProfileWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface TiktokProfileWebhookUseCaseResponse {}

export class TiktokProfileWebhookUseCase {
  constructor(private awsNotificationRepository: AwsNotificationRepository) {}

  async execute({
    records,
  }: TiktokProfileWebhookUseCaseRequest): Promise<TiktokProfileWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3TiktokProfileNotification({
        records,
      });

    return data;
  }
}
