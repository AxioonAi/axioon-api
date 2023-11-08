import { prisma } from "@/lib/prisma";
import { FacebookBaseDataRepository } from "../FacebookBaseDataRepository";

export class PrismaFacebookBaseDataRepository
  implements FacebookBaseDataRepository
{
  async createMany(
    data: {
      user_id: string;
      likes_count: number;
      followers_count: number;
      start_of_period: Date;
      end_of_period: Date;
    }[]
  ) {
    await prisma.facebookBaseData.createMany({
      data,
    });

    return;
  }
}
