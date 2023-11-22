import { prisma } from "@/lib/prisma";
import { InstagramPostCommentRepository } from "../InstagramPostCommentRepository";

export class PrismaInstagramCommentRepository
  implements InstagramPostCommentRepository
{
  async createMany(
    data: {
      id: string;
      politician_id: string;
      text: string;
      ownerProfilePicUrl: string;
      post_id: string;
      ownerUsername: string;
      timestamp: string;
      likeCount: number;
    }[]
  ) {
    const idExists = data.map((item) => item.id);

    const commentExists = await prisma.instagramPostComment.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createCommentData: any = [];
    const updateCommentData: any = [];

    data.forEach((item) => {
      if (!commentExists.find((comment) => comment.id === item.id)) {
        createCommentData.push({
          ...item,
          sentimentAnalysis: Math.floor(Math.random() * (100 - 1000) + 100),
        });
      } else {
        updateCommentData.push({
          ...item,
          sentimentAnalysis: Math.floor(Math.random() * (1000 - 100) + 100),
        });
      }
    });

    await prisma.$transaction([
      prisma.instagramPostComment.createMany({ data: createCommentData }),
      ...updateCommentData.map((update: any) =>
        prisma.instagramPostComment.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);
  }
}
