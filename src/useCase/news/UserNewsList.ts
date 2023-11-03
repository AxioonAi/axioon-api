import { NewsRepository } from "@/repositories/NewsRepository";
import { News } from "@prisma/client";

interface UserNewsListUseCaseRequest {
  userId: string;
}

interface UserNewsListUseCaseResponse {
  news: News[];
}

export class UserNewsListUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute({
    userId,
  }: UserNewsListUseCaseRequest): Promise<UserNewsListUseCaseResponse> {
    const news = await this.newsRepository.findByUserId(userId);

    return { news };
  }
}
