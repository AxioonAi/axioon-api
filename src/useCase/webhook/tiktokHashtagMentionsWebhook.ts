import { TiktokHashtagMentionCreateInterface } from "@/@types/databaseInterfaces";
import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { TiktokEngagerRepository } from "@/repositories/TiktokEngagerRepository";
import { GptRepository } from "@/repositories/gptRepository";
import { TiktokHashtagMentionRepository } from "@/repositories/tiktokHashtagMentionRepository";

interface TiktokHashtagMentionsWebhookUseCaseRequest {
  records: string;
}

export class TiktokHashtagMentionsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private tiktokHashtagMentionRepository: TiktokHashtagMentionRepository,
    private gptRepository: GptRepository
  ) {}

  async execute({
    records,
  }: TiktokHashtagMentionsWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3TiktokHashtagMentionsNotification({
        records,
      });

    const mentionExists =
      await this.tiktokHashtagMentionRepository.mentionExists(
        data.map((item) => item.id)
      );

    const analysisFilter = data.filter(
      (item) => !mentionExists.includes(item.id)
    );

    // const gptAnalysis = await this.gptRepository.mentionAnalysis(
    //   analysisFilter
    // );

    const createData: TiktokHashtagMentionCreateInterface[] = [];

    for (const item of data) {
      // const analysis = gptAnalysis.find((analysis) => analysis.id === item.id);
      const { description, ...rest } = item;
      // if (analysis) {
      createData.push({
        ...rest,
        // ...analysis,
        // sentimentAnalysis: 500,
        text: description,
        // text: analysis.description,
      });
      // }
    }

    await this.tiktokHashtagMentionRepository.createMany(createData);
    return;
  }
}
