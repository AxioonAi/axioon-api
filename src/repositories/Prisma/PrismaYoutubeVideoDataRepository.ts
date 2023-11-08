import { prisma } from "@/lib/prisma";
import { YoutubeVideoDataRepository } from "../YoutubeVideoDataRepository";

export class PrismaYoutubeVideoDataRepository
  implements YoutubeVideoDataRepository
{
  async createMany(
    data: {
      id: string;
      videos: {
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
          user_id: item.id,
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

    await prisma.youtubeVideoData.createMany({
      data: createData,
    });

    return;
  }
}
