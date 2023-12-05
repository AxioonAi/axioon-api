import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { YoutubeCommentsRepository } from "@/repositories/YoutubeCommentRepository";

interface YoutubeCommentsWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface YoutubeCommentsWebhookUseCaseResponse {}

export class YoutubeCommentsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private youtubeCommentsRepository: YoutubeCommentsRepository
  ) {}

  async execute({
    records,
  }: YoutubeCommentsWebhookUseCaseRequest): Promise<YoutubeCommentsWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3YoutubeCommentsNotification({
        records,
      });

    await this.youtubeCommentsRepository.createMany(data);
    return data;
  }
}
