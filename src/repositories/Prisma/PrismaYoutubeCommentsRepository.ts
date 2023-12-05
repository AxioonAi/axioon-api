import { prisma } from "@/lib/prisma";
import { YoutubeCommentsRepository } from "../YoutubeCommentRepository";

export class PrismaYoutubeCommentsRepository
  implements YoutubeCommentsRepository
{
  async createMany(data: any[]) {
    const videoId = data.map((item) => item.video_id);
    const idExists = data.map((item) => item.id);

    const [videoExists, commentExists] = await Promise.all([
      prisma.youtubeVideoData.findMany({
        where: {
          id: {
            in: videoId,
          },
        },
      }),
      prisma.youtubeCommentData.findMany({
        where: {
          id: {
            in: idExists,
          },
        },
      }),
    ]);

    const createData: any = [];
    const updateData: any = [];

    data.forEach((item) => {
      if (!commentExists.find((comment) => comment.id === item.id)) {
        const video = videoExists.find((video) => video.id === item.video_id);
        if (video && item.text) {
          createData.push({
            ...item,
            sentimentAnalysis: Math.floor(Math.random() * (100 - 1000) + 100),
            politician_id: video.politician_id,
          });
        } else {
        }
      } else {
        updateData.push(item);
      }
    });

    await prisma.$transaction([
      prisma.youtubeCommentData.createMany({ data: createData }),
      ...updateData.map((update: any) =>
        prisma.youtubeCommentData.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);

    return;
  }
}
