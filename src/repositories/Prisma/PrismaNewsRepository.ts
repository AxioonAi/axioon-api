import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import moment from "moment";
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

    await prisma.newsUsers.createMany({
      data: createUserData,
    });

    return news;
  }

  async findByUserId(userId: string) {
    const start = moment().clone().weekday(1).toDate();
    const end = moment().clone().weekday(5).toDate();

    return await prisma.news.findMany({
      where: {
        last_update: {
          gte: start,
          lte: end,
        },
        users: {
          some: {
            user_id: userId,
          },
        },
      },
      orderBy: {
        last_update: "desc",
      },
    });
  }
}
