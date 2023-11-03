import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { NewsRepository } from "@/repositories/NewsRepository";
import { News } from "@prisma/client";

interface CreateNewsUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface CreateNewsUseCaseResponse {
  news: News;
}

export class CreateNewsUseCase {
  constructor(
    private newsRepository: NewsRepository,
    private awsNotificationRepository: AwsNotificationProductionRepository
  ) {}

  async execute({
    records,
  }: CreateNewsUseCaseRequest): Promise<CreateNewsUseCaseResponse> {
    const data = await this.awsNotificationRepository.S3NewsNotification({
      records,
    });
    console.log(data[0].users);
    const news = await this.newsRepository.createMany(data);

    return { news };
  }
}
