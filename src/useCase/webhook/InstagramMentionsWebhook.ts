import { InstagramMentionCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramMentionRepository } from "@/repositories/InstagramMentionRepository";
import { GptRepository } from "@/repositories/gptRepository";
import { InstagramEngagerRepository } from "@/repositories/instagramEngagerRepository";

interface InstagramMentionsWebhookUseCaseRequest {
  records: string;
}

export class InstagramMentionsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramMentionRepository: InstagramMentionRepository,
    private gptRepository: GptRepository,
    private instagramEngagerRepository: InstagramEngagerRepository
  ) {}

  async execute({
    records,
  }: InstagramMentionsWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3InstagramMentionsNotification({
        records,
      });

    console.log(data);

    const mentionExists = await this.instagramMentionRepository.mentionExists(
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

    const gptAnalysis = await this.gptRepository.mentionAnalysis(
      analysisFilter
    );

    const createData: InstagramMentionCreateInterface[] = [];

    for (const item of data) {
      const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
      const engager = createEngager.find(
        (engager) => engager.username === item.ownerUsername
      );
      if (analysis) {
        createData.push({
          ...item,
          ...analysis,
          sentimentAnalysis: 500,
          instagramEngagerId: engager && engager.id,
        });
      }
    }

    await this.instagramMentionRepository.createMany(createData);
    return;
  }
}
