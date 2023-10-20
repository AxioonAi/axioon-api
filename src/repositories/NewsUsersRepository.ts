import { News, Prisma } from "@prisma/client";

export interface NewsUserRepository {
  findById(id: string): Promise<News>;
  create(data: Prisma.NewsCreateInput): Promise<News>;
  findByUserId(id: string): Promise<News[]>;
}
