import { News, NewsScore } from "@prisma/client";

export interface CreateNewsInterface {
  title: string;
  last_update: string;
  url: string;
  score: NewsScore;
  users: {
    user_id: string;
  }[];
}

export interface NewsRepository {
  // findById(id: string): Promise<News>;
  create(data: CreateNewsInterface): Promise<News>;
  createMany(data: CreateNewsInterface[]): Promise<any>;
  // findByUserId(id: string): Promise<News[]>;
}
