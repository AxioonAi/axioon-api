import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramPostCommentRepository } from "@/repositories/InstagramPostCommentRepository";

interface InstagramCommentsWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface InstagramCommentsWebhookUseCaseResponse {}

export class InstagramCommentsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramCommentsRepository: InstagramPostCommentRepository
  ) {}

  async execute({
    records,
  }: InstagramCommentsWebhookUseCaseRequest): Promise<InstagramCommentsWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3InstagramCommentsNotification({
        records,
      });

    await this.instagramCommentsRepository.createMany(data);
    return data;
  }
}
