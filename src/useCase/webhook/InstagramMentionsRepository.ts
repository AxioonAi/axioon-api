import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramMentionCommentRepository } from "@/repositories/InstagramMentionCommentRepository";
import { InstagramMentionRepository } from "@/repositories/InstagramMentionRepository";

interface makeInstagramMentionsWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface makeInstagramMentionsWebhookUseCaseResponse {}

export class makeInstagramMentionsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramMentionRepository: InstagramMentionRepository,
    private instagramMentionCommentRepository: InstagramMentionCommentRepository
  ) {}

  async execute({
    records,
  }: makeInstagramMentionsWebhookUseCaseRequest): Promise<makeInstagramMentionsWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3InstagramMentionsNotification({
        records,
      });

    await this.instagramMentionRepository.createMany(data.mentionData);
    await this.instagramMentionCommentRepository.createMany(data.commentData);
    return {};
  }
}
