import { TiktokCommentsCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { TiktokEngagerRepository } from "@/repositories/TiktokEngagerRepository";
import { GptRepository } from "@/repositories/gptRepository";
import { TiktokHashtagMentionCommentRepository } from "@/repositories/tiktokHashtagMentionCommentRepository";
import { TiktokHashtagMentionRepository } from "@/repositories/tiktokHashtagMentionRepository";

interface TiktokHashtagMentionCommentsWebhookUseCaseRequest {
  records: string;
}

export class TiktokHashtagMentionCommentsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private tiktokHashtagMentionCommentsRepository: TiktokHashtagMentionCommentRepository,
    private gptRepository: GptRepository,
    private tiktokHashtagMentionRepository: TiktokHashtagMentionRepository
  ) // private tiktokEngagerRepository: TiktokEngagerRepository
  {}

  async execute({
    records,
  }: TiktokHashtagMentionCommentsWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3TiktokCommentsNotification({
        records,
      });

    const commentExists =
      await this.tiktokHashtagMentionCommentsRepository.commentExists(
        data.map((item) => item.id)
      );

    const analysisFilter = data.filter(
      (item) => !commentExists.includes(item.id)
    );

    // const engagers = analysisFilter.map((item) => ({
    //   username: item.author,
    // }));

    // const createEngager = await this.tiktokEngagerRepository.createMany(
    //   engagers
    // );

    const mentionExists =
      await this.tiktokHashtagMentionRepository.mentionExists(
        analysisFilter.map((item) => item.video_id)
      );

    const gptAnalysis = await this.gptRepository.commentAnalysis(
      analysisFilter.filter((item) => mentionExists.includes(item.video_id))
    );

    const createData: TiktokCommentsCreateInterface[] = [];

    for (const item of data) {
      const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
      //   const engager = createEngager.find(
      //     (engager) => engager.username === item.author
      //   );
      if (analysis) {
        createData.push({
          ...item,
          ...analysis,
          //   tiktokEngagerId: engager && engager.id,
        });
      }
    }

    await this.tiktokHashtagMentionCommentsRepository.createMany(createData);
    return;
  }
}
