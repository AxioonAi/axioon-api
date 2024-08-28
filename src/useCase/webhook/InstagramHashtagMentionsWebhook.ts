import {
  InstagramHashtagMentionCreateInterface,
  InstagramMentionCreateInterface,
} from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { GptRepository } from "@/repositories/gptRepository";
import { InstagramEngagerRepository } from "@/repositories/instagramEngagerRepository";
import { InstagramHashtagMentionRepository } from "@/repositories/instagramHashtagMentionRepository";

interface InstagramHashtagMentionsWebhookUseCaseRequest {
  records: string;
}

export class InstagramHashtagMentionsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramHashtagMentionRepository: InstagramHashtagMentionRepository,
    private gptRepository: GptRepository,
    private instagramEngagerRepository: InstagramEngagerRepository
  ) {}

  async execute({
    records,
  }: InstagramHashtagMentionsWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3InstagramHashtagMentionsNotification(
        {
          records,
        }
      );

    const mentionExists =
      await this.instagramHashtagMentionRepository.mentionExists(
        data.map((item) => item.id)
      );

    const analysisFilter = data.filter(
      (item) => !mentionExists.includes(item.id)
    );

    const engagers = analysisFilter.map((item) => ({
      username: item.ownerUsername,
    }));

    const createEngager = await this.instagramEngagerRepository.createMany(
      engagers
    );

    // const gptAnalysis = await this.gptRepository.mentionAnalysis(
    //   analysisFilter
    // );

    const createData: InstagramHashtagMentionCreateInterface[] = [];

    for (const item of data) {
      // const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
      const engager = createEngager.find(
        (engager) => engager.username === item.ownerUsername
      );
      // if (analysis) {
      createData.push({
        ...item,
        // ...analysis,
        sentimentAnalysis: 500,
        instagramEngagerId: engager && engager.id,
      });
      // }
    }

    await this.instagramHashtagMentionRepository.createMany(createData);
    return;
  }
}
