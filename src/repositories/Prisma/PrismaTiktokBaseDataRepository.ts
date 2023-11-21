import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { TiktokBaseDataRepository } from "../TiktokBaseDataRepository";

export class PrismaTiktokBaseDataRepository
  implements TiktokBaseDataRepository
{
  async findByUserId(userId: string) {
    return await prisma.tiktokBaseData.findMany({
      where: {
        politician_id: userId,
      },
    });
  }

  async createMany(data: Prisma.TiktokBaseDataCreateManyInput) {
    return await prisma.tiktokBaseData.createMany({
      data,
    });
  }

  async findDetails(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any> {
    return await prisma.tiktokBaseData.findFirst({
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
