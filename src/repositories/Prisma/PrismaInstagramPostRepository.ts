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

    const createData: any = [];
    const updateData: any = [];

    data.forEach((item) => {
      if (!idExits.find((d) => d.id === item.id)) {
        createData.push(item);
      } else {
        updateData.push(item);
      }
    });

    console.log(createData.length);
    console.log(updateData.length);

    await prisma.$transaction([
      prisma.instagramPost.createMany({ data: createData }),
      ...updateData.map((update: any) =>
        prisma.instagramPost.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);

    console.log("saiu");
    return;
  }

  async findDetails(data: { id: string; startDate: Date; endDate: Date }) {
    return await prisma.instagramPost.findMany({
      where: {
        politician_id: data.id,
        pubDate: {
          gte: data.startDate,
          lte: data.endDate,
        },
      },
      include: {
        comments: true,
      },
    });
  }
}
