import { NewsRepository } from "@/repositories/NewsRepository";
import { News } from "@prisma/client";

interface CreateNewsUseCaseRequest {
  news: {
    title: string;
    content: string[];
    last_update: string;
    url: string;
    users: string[];
  };
}

interface CreateNewsUseCaseResponse {
  news: News;
}

export class CreateNewsUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute({
    news,
  }: CreateNewsUseCaseRequest): Promise<CreateNewsUseCaseResponse> {
    const createNews = await this.newsRepository.create(news);

    return {
      news: createNews,
    };
  }
}
