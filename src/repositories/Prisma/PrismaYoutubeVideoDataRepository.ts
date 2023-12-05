import { prisma } from "@/lib/prisma";
import moment from "moment";
import { YoutubeVideoDataRepository } from "../YoutubeVideoDataRepository";

export class PrismaYoutubeVideoDataRepository
  implements YoutubeVideoDataRepository
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
  ) {
    console.log(data);
    const idExists = data.map((item) => item.id);

    const videoExists = await prisma.youtubeVideoData.findMany({
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

    await prisma.$transaction([
      prisma.youtubeVideoData.createMany({ data: createVideoData }),
      ...updateVideoData.map((update: any) =>
        prisma.youtubeVideoData.update({
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
      prisma.youtubeVideoData.aggregate({
        where: {
          politician_id: data.id,
          date: {
            gte: data.startDate,
            lte: data.endDate,
          },
        },
        _sum: {
          viewCount: true,
          commentsCount: true,
          likes: true,
        },
      }),
      prisma.youtubeVideoData.aggregate({
        where: {
          politician_id: data.id,
          date: {
            gte: moment(data.startDate).subtract(7, "day").toDate(),
            lte: moment(data.endDate).subtract(7, "day").toDate(),
          },
        },
        _sum: {
          viewCount: true,
          commentsCount: true,
          likes: true,
        },
      }),
    ]);
  }
}
