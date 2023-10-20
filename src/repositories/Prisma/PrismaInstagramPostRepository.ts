import { prisma } from "@/lib/prisma";
import { InstagramPostRepository } from "../InstagramPostRepository";

export class PrismaInstagramPostRepository implements InstagramPostRepository {
  async createMany(
    data: {
      postUrl: string;
      description: string;
      commentCount: number;
      likeCount: number;
      pubDate: Date;
      viewCount: number;
      username: string;
      imgUrl: string;
      postId: string;
      query: string;
      user_instagram: string;
    }[]
  ) {
    const posts = await prisma.instagramPost.createMany({
      data,
    });

    return { posts };
  }
}
