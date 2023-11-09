import { prisma } from "@/lib/prisma";
import { InstagramMentionCommentRepository } from "../InstagramMentionCommentRepository";

export class PrismaInstagramMentionCommentRepository
  implements InstagramMentionCommentRepository
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
    await prisma.instagramMentionComment.createMany({
      data,
    });
  }
}
