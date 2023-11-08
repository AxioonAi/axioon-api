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
      user_id: string;
      playCount: number;
    }[]
  ) {
    // for (let i = 0; i < 13; i++) {
    //   await prisma.instagramPost.create({
    //     data: {
    //       postUrl: data[i].postUrl,
    //       description: data[i].description,
    //       commentCount: data[i].commentCount,
    //       likeCount: data[i].likeCount,
    //       pubDate: data[i].pubDate,
    //       viewCount: data[i].viewCount,
    //       username: data[i].username,
    //       imgUrl: data[i].imgUrl,
    //       postId: data[i].postId,
    //       user_id: data[i].user_id,
    //       playCount: data[i].playCount,
    //     },
    //   });
    // }

    const posts = await prisma.instagramPost.createMany({
      data,
    });
    return;
  }
}
