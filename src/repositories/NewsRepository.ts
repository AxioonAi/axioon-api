import { News } from "@prisma/client";

export interface CreateNewsInterface {
  title: string;
  content: string[];
  last_update: string;
  url: string;
  users: string[];
}

export interface NewsRepository {
  // findById(id: string): Promise<News>;
  create(data: CreateNewsInterface): Promise<News>;
  // findByUserId(id: string): Promise<News[]>;
}
