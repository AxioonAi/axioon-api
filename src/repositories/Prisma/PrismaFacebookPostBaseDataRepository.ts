import { FacebookPostCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import moment from "moment";
import { FacebookPostBaseDataRepository } from "../FacebookPostBaseDataRepository";

export class PrismaFacebookPostBaseDataRepository
  implements FacebookPostBaseDataRepository
{
  async createMany(data: FacebookPostCreateInterface[]) {
    const idExists = data.map((item) => item.id);
    const postExists = await prisma.facebookPostBaseData.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createPostData: FacebookPostCreateInterface[] = [];
    const updatePostData: FacebookPostCreateInterface[] = [];

    data.forEach((item) => {
      if (!postExists.find((video) => video.id === item.id)) {
        createPostData.push(item);
      } else {
        updatePostData.push(item);
      }
    });

    await prisma.$transaction([
      prisma.facebookPostBaseData.createMany({ data: createPostData }),
      ...updatePostData.map((update) =>
        prisma.facebookPostBaseData.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);

    return;
  }

  async findDetails(data: { id: string; period: number }): Promise<any> {
    return await prisma.facebookPostBaseData.findMany({
      where: {
        politician_id: data.id,
        date: {
          gte: moment().subtract(data.period, "day").toDate(),
          lte: moment().toDate(),
        },
      },
    });
  }

  async findHomeData(data: { id: string; period: number }): Promise<any> {
    return await Promise.all([
      prisma.facebookPostBaseData.aggregate({
        where: {
          politician_id: data.id,
          date: {
            gte: moment().subtract(data.period, "day").toDate(),
            lte: moment().toDate(),
          },
        },
        _sum: {
          like: true,
          comments: true,
          shares: true,
        },
      }),
      prisma.facebookPostBaseData.aggregate({
        where: {
          politician_id: data.id,
          date: {
            gte: moment()
              .subtract(data.period * 2, "day")
              .toDate(),
            lte: moment().subtract(data.period, "day").toDate(),
          },
        },
        _sum: {
          like: true,
          comments: true,
          shares: true,
        },
      }),
    ]);
  }

  async findStatistics(data: { id: string; period: number }): Promise<any> {
    return await Promise.all([
      prisma.facebookPostBaseData.aggregate({
        where: {
          politician_id: data.id,
          date: {
            gte: moment().subtract(data.period, "day").toDate(),
            lte: moment().toDate(),
          },
        },
        _sum: {
          like: true,
          comments: true,
          shares: true,
        },
      }),
      prisma.facebookPostBaseData.aggregate({
        where: {
          politician_id: data.id,
          date: {
            gte: moment()
              .subtract(data.period * 2, "day")
              .toDate(),
            lte: moment()
              .subtract(data.period + 1, "day")
              .toDate(),
          },
        },
        _sum: {
          like: true,
          comments: true,
          shares: true,
        },
      }),
    ]);
  }
}
