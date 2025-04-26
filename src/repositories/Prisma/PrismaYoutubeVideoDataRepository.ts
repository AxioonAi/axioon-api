import { YoutubeVideoCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { YoutubeVideoDataRepository } from "../YoutubeVideoDataRepository";

export class PrismaYoutubeVideoDataRepository
  implements YoutubeVideoDataRepository
{
  async createMany(data: YoutubeVideoCreateInterface[]) {
    const filterDuplicated = data.filter((item, index) => {
      return data.findIndex((obj) => obj.id === item.id) === index;
    });

    console.log(filterDuplicated);

    const idExists = filterDuplicated.map((item) => item.id);

    const videoExists = await prisma.youtubeVideoData.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createVideoData: YoutubeVideoCreateInterface[] = [];
    const updateVideoData: YoutubeVideoCreateInterface[] = [];

    for (const item of filterDuplicated) {
      if (!videoExists.find((video) => video.id === item.id)) {
        createVideoData.push(item);
      } else {
        updateVideoData.push(item);
      }
    }

    await prisma.$transaction([
      prisma.youtubeVideoData.createMany({ data: createVideoData }),
      ...updateVideoData.map((update: YoutubeVideoCreateInterface) =>
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

  async videoExists(id: string[]) {
    const videoExists = await prisma.youtubeVideoData.findMany({
      where: {
        id: {
          in: id,
        },
      },
    });

    return videoExists.map((video) => video.id);
  }
}
