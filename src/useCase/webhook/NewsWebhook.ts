import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { NewsRepository } from "@/repositories/NewsRepository";
import { GptRepository } from "@/repositories/gptRepository";

interface NewsWebhookUseCaseRequest {
  records: string;
}

export class NewsWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private gptRepository: GptRepository,
    private newsRepository: NewsRepository
  ) {}

  async execute({ records }: NewsWebhookUseCaseRequest): Promise<void> {
    const data = await this.awsNotificationRepository.S3NewsNotification({
      records,
    });

    const newsExists = await this.newsRepository.newsExists(
      data.map((item) => item.url)
    );

    const analysisFilter = data.filter(
      (item) => !newsExists.includes(item.url)
    );

    const gptAnalysis = await this.gptRepository.newsAnalysis(analysisFilter);

    const createData = [];

    for (const item of gptAnalysis) {
      const fullNews = data.find((news) => news.title === item.title);
      if (fullNews) {
        createData.push({
          ...item,
          last_update: fullNews.last_update,
          url: fullNews.url,
          website_id: fullNews.website_id,
        });
      }
    }

    await this.newsRepository.createMany(createData);

    return;
  }
}
