import { prisma } from "@/lib/prisma";
import { CreateNewsInterface, NewsRepository } from "../NewsRepository";

export class PrismaNewsRepository implements NewsRepository {
  async create(data: CreateNewsInterface) {
    const { content, users, ...rest } = data;

    const createUsers = users.map((user) => ({
      user_id: user,
    }));

    const createContent = content.map((content) => ({
      content: content,
    }));

    return await prisma.news.create({
      data: {
        ...rest,
        content: {
          create: createContent,
        },
        users: {
          create: createUsers,
        },
      },
    });
  }
}
