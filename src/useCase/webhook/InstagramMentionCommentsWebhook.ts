import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramMentionCommentRepository } from "@/repositories/InstagramMentionCommentRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface InstagramMentionCommentsWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface InstagramMentionCommentsWebhookUseCaseResponse {}

export class InstagramMentionCommentsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramMentionCommentsRepository: InstagramMentionCommentRepository,
    private gptRepository: GptRepository
  ) {}

  async execute({
    records,
  }: InstagramMentionCommentsWebhookUseCaseRequest): Promise<InstagramMentionCommentsWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3InstagramCommentsNotification({
        records,
      });
    const gptAnalysis = await this.gptRepository.commentAnalysis(data);
    const createData: InstagramCommentCreateInterface[] = [];
    data.forEach((item) => {
      const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
      if (analysis) {
        createData.push({
          ...item,
          ...analysis,
        });
      }
    });
    await this.instagramMentionCommentsRepository.createMany(createData);
    return {};
  }
}
