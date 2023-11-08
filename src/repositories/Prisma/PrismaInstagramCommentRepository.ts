import { prisma } from "@/lib/prisma";
import { InstagramPostCommentRepository } from "../InstagramPostCommentRepository";

export class PrismaInstagramCommentRepository
  implements InstagramPostCommentRepository
{
  async createMany(
    data: {
      text: string;
      ownerProfilePicUrl: string;
      post_id: string;
      ownerUsername: string;
      timestamp: string;
      likeCount: number;
    }[]
  ) {
    await prisma.instagramPostComment.createMany({
      data,
    });
  }
}
