import { PrismaNewsRepository } from "@/repositories/Prisma/PrismaNewsRepository";
import { UserNewsListUseCase } from "@/useCase/news/UserNewsList";

export function makeUserNewsList() {
  const newsRepository = new PrismaNewsRepository();
  return new UserNewsListUseCase(newsRepository);
}
