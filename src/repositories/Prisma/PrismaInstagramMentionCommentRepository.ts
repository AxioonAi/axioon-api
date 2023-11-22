import { prisma } from "@/lib/prisma";
import { InstagramMentionCommentRepository } from "../InstagramMentionCommentRepository";

export class PrismaInstagramMentionCommentRepository
  implements InstagramMentionCommentRepository
{
  async createMany(
    data: {
      id: string;
      text: string;
      ownerProfilePicUrl: string;
      post_id: string;
      politician_id: string;
      ownerUsername: string;
      timestamp: string;
      likeCount: number;
    }[]
  ) {
    const idExists = data.map((item) => item.id);

    const commentExists = await prisma.instagramMentionComment.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createData: any[] = [];
    const updateData: any[] = [];

    data.forEach((item) => {
      if (!commentExists.find((comment) => comment.id === item.id)) {
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
      prisma.instagramMentionComment.createMany({ data: createData }),
      ...updateData.map((update) =>
        prisma.instagramMentionComment.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);
  }
}
