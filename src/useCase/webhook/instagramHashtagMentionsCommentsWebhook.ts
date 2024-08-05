import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { GptRepository } from "@/repositories/gptRepository";
import { InstagramEngagerRepository } from "@/repositories/instagramEngagerRepository";
import { InstagramHashtagMentionCommentRepository } from "@/repositories/instagramHashtagMentionComment";
import { InstagramHashtagMentionRepository } from "@/repositories/instagramHashtagMentionRepository";

interface InstagramHashtagMentionCommentsWebhookUseCaseRequest {
  records: string;
}

export class InstagramHashtagMentionCommentsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramHashtagMentionCommentsRepository: InstagramHashtagMentionCommentRepository,
    private gptRepository: GptRepository,
    private instagramHashtagMentionRepository: InstagramHashtagMentionRepository,
    private instagramEngagerRepository: InstagramEngagerRepository
  ) {}

  async execute({
    records,
  }: InstagramHashtagMentionCommentsWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3InstagramCommentsNotification({
        records,
      });

    const commentExists =
      await this.instagramHashtagMentionCommentsRepository.commentExists(
        data.map((item) => item.id)
      );

    const analysisFilter = data.filter(
      (item) => !commentExists.includes(item.id)
    );

    const engagers = analysisFilter.map((item) => ({
      username: item.ownerUsername,
    }));

    const createEngager = await this.instagramEngagerRepository.createMany(
      engagers
    );

    const mentionExists =
      await this.instagramHashtagMentionRepository.mentionExistsByUrls(
        analysisFilter.map((item) => item.post_id)
      );

    const gptAnalysis = await this.gptRepository.commentAnalysis(
      analysisFilter.filter((item) => mentionExists.includes(item.post_id))
    );

    const createData: InstagramCommentCreateInterface[] = [];

    for (const item of data) {
      const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
      const engager = createEngager.find(
        (engager) => engager.username === item.ownerUsername
      );
      if (analysis) {
        createData.push({
          ...item,
          ...analysis,
          instagramEngagerId: engager && engager.id,
        });
      }
    }

    await this.instagramHashtagMentionCommentsRepository.createMany(createData);
    return;
  }
}
