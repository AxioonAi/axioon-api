import { prisma } from "@/lib/prisma";
import { FacebookBaseDataRepository } from "../FacebookBaseDataRepository";

export class PrismaFacebookBaseDataRepository
  implements FacebookBaseDataRepository
{
  async createMany(
    data: {
      politician_id: string;
      title: string;
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

  async findDetails(data: { id: string; startDate: Date; endDate: Date }) {
    return await prisma.facebookBaseData.findFirst({
      where: {
        politician_id: data.id,
        start_of_period: {
          gte: data.startDate,
          lte: data.endDate,
        },
      },
      orderBy: {
        end_of_period: "asc",
      },
    });
  }
}
