import { prisma } from "@/lib/prisma";
import moment from "moment";
import { TiktokVideoDataRepository } from "../TiktokVideoDataRepository";

export class PrismaTiktokVideoDataRepository
  implements TiktokVideoDataRepository
{
  async createMany(
    data: {
      id: string;
      title: string;
      description: string;
      url: string;
      duration: string;
      date: Date;
      imgUrl: string;
      viewCount: number;
      commentsCount: number;
      likes: number;
    }[]
  ): Promise<any> {
    const idExists = data.map((item) => item.id);

    const videoExists = await prisma.tiktokVideoData.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createVideoData: any = [];
    const updateVideoData: any = [];

    data.forEach((item) => {
      if (!videoExists.find((video) => video.id === item.id)) {
        createVideoData.push(item);
      } else {
        updateVideoData.push(item);
      }
    });

    console.log(createVideoData);

    await prisma.$transaction([
      prisma.tiktokVideoData.createMany({ data: createVideoData }),
      ...updateVideoData.map((update: any) =>
        prisma.tiktokVideoData.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);

    return;
  }

  async findHomeData(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any> {
    return await Promise.all([
      prisma.tiktokVideoData.aggregate({
        where: {
          politician_id: data.id,
          date: {
            gte: data.startDate,
            lte: data.endDate,
          },
        },
        _sum: {
          diggCount: true,
          commentCount: true,
          playCount: true,
          shareCount: true,
        },
      }),
      prisma.tiktokVideoData.aggregate({
        where: {
          politician_id: data.id,
          date: {
            gte: moment(data.startDate).subtract(7, "day").toDate(),
            lte: moment(data.endDate).subtract(7, "day").toDate(),
          },
        },
        _sum: {
          diggCount: true,
          commentCount: true,
          playCount: true,
          shareCount: true,
        },
      }),
    ]);
  }
}
