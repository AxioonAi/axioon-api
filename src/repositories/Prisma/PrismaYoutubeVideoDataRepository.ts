import { prisma } from "@/lib/prisma";
import moment from "moment";
import { YoutubeVideoDataRepository } from "../YoutubeVideoDataRepository";

export class PrismaYoutubeVideoDataRepository
  implements YoutubeVideoDataRepository
{
  async createMany(
    data: {
      id: string;
      videos: {
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
      }[];
    }[]
  ) {
    const createData: any[] = [];

    data.forEach((item) => {
      item.videos.forEach((video) => {
        createData.push({
          id: video.id,
          politician_id: item.id,
          title: video.title,
          description: video.description,
          url: video.url,
          duration: video.duration,
          date: video.date,
          imgUrl: video.imgUrl,
          viewCount: video.viewCount,
          commentsCount: video.commentsCount,
          likes: video.likes,
          created_at: new Date(),
        });
      });
    });

    const idExists = createData.map((item) => item.id);

    const videoExists = await prisma.youtubeVideoData.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createVideoData: any = [];
    const updateVideoData: any = [];

    createData.forEach((item) => {
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
