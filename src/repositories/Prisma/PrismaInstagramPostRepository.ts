import { InstagramPostCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { InstagramPostRepository } from "../InstagramPostRepository";

export class PrismaInstagramPostRepository implements InstagramPostRepository {
  async createMany(
    data: {
      id: string;
      postUrl: string;
      description: string;
      commentCount: number;
      likeCount: number;
      pubDate: Date;
      viewCount: number;
      username: string;
      imgUrl: string;
      postId: string;
      politician_id: string;
      playCount: number;
    }[]
  ) {
    const idExits = await prisma.instagramPost.findMany({
      where: {
        id: {
          in: data.map((d) => d.id),
        },
      },
    });

    const createData: InstagramPostCreateInterface[] = [];
    const updateData: InstagramPostCreateInterface[] = [];

    data.forEach((item) => {
      if (!idExits.find((d) => d.id === item.id)) {
        createData.push({
          ...item,
          playCount: item.playCount ? item.playCount : 0,
        });
      } else {
        updateData.push({
          ...item,
          playCount: item.playCount ? item.playCount : 0,
        });
      }
    });

    await prisma.$transaction([
      prisma.instagramPost.createMany({ data: createData }),
      ...updateData.map((update: InstagramPostCreateInterface) =>
        prisma.instagramPost.update({
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
