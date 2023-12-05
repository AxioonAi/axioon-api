import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { TiktokCommentDataRepository } from "@/repositories/TiktokCommentDataRepository";

interface TiktokCommentsWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface TiktokCommentsWebhookUseCaseResponse {}

export class TiktokCommentsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private tiktokCommentsRepository: TiktokCommentDataRepository
  ) {}

  async execute({
    records,
  }: TiktokCommentsWebhookUseCaseRequest): Promise<TiktokCommentsWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3TiktokCommentsNotification({
        records,
      });

    await this.tiktokCommentsRepository.createMany(data);

    return data;
  }
}
