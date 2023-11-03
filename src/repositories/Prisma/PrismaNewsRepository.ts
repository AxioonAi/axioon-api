import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { CreateNewsInterface, NewsRepository } from "../NewsRepository";

export class PrismaNewsRepository implements NewsRepository {
  async create(data: CreateNewsInterface) {
    const { users, ...rest } = data;

    return await prisma.news.create({
      data: {
        ...rest,
        users: {
          create: users,
        },
      },
    });
  }

  async createMany(data: CreateNewsInterface[]) {
    const createUserData: any = [];
    const createData = data.map((item) => {
      const { users, ...rest } = item;
      const id = randomUUID();
      createUserData.push(...users.map((user) => ({ ...user, news_id: id })));
      return {
        ...rest,
        id,
      };
    });

    const news = await prisma.news.createMany({
      data: createData,
    });

    console.log(createUserData);

    await prisma.newsUsers.createMany({
      data: createUserData,
    });

    return news;
  }
}
