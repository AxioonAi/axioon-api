import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { FacebookPostCommentsRepository } from "@/repositories/FacebookPostCommentsRepository";

interface FacebookCommentsWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface FacebookCommentsWebhookUseCaseResponse {}

export class FacebookCommentsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private facebookCommentsRepository: FacebookPostCommentsRepository
  ) {}

  async execute({
    records,
  }: FacebookCommentsWebhookUseCaseRequest): Promise<FacebookCommentsWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3FacebookCommentsNotification({
        records,
      });

    await this.facebookCommentsRepository.createMany(data);

    return data;
  }
}
