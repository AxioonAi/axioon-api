import { prisma } from "@/lib/prisma";
import { InstagramMentionRepository } from "../InstagramMentionRepository";

export class PrismaInstagramMentionRepository
  implements InstagramMentionRepository
{
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
      ownerFullName: string;
      ownerUsername: string;
    }[]
  ) {
    const idExists = data.map((item) => item.id);

    const mentionExists = await prisma.instagramMention.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createData: any[] = [];
    const updateData: any[] = [];

    data.forEach((item) => {
      if (!mentionExists.find((mention) => mention.id === item.id)) {
        createData.push({
          ...item,
          sentimentAnalysis: Math.floor(Math.random() * (100 - 1000) + 100),
        });
      } else {
        updateData.push({
          ...item,
          sentimentAnalysis: Math.floor(Math.random() * (1000 - 100) + 100),
        });
      }
    });

    await prisma.$transaction([
      prisma.instagramMention.createMany({ data: createData }),
      ...updateData.map((update) =>
        prisma.instagramMention.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);
  }
}
