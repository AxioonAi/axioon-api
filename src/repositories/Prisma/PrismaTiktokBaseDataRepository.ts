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
}
