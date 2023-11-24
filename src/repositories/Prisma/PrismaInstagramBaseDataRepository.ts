import { prisma } from "@/lib/prisma";
import { InstagramBaseDataRepository } from "../InstagramBaseDataRepository";

export class PrismaInstagramBaseDataRepository
  implements InstagramBaseDataRepository
{
  async createMany(
    data: {
      politician_id: string;
      followers: number;
      follows: number;
      posts_count: number;
      reels_count: number;
      business: boolean;
      verified: boolean;
      biography: string;
      url: string;
      fullName: string;
      profilePicture: string;
      start_of_period: Date;
      end_of_period: Date;
    }[]
  ) {
    await prisma.instagramBaseData.createMany({
      data,
    });
  }

  async findDetails(data: { id: string; startDate: Date; endDate: Date }) {
    return await prisma.instagramBaseData.findFirst({
      where: {
        politician_id: data.id,
        start_of_period: {
          gte: data.startDate,
          lte: data.endDate,
        },
      },
    });
  }
}
