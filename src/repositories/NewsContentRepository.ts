import { NewsContent, Prisma } from "@prisma/client";

export interface NewsContentRepository {
  findById(id: string): Promise<NewsContent>;
  create(data: Prisma.NewsContentCreateInput): Promise<NewsContent>;
  findByNewsId(newsId: string): Promise<NewsContent[]>;
}
