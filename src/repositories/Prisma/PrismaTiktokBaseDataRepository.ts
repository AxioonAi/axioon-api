import { TiktokBaseDataCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { TiktokBaseDataRepository } from "../TiktokBaseDataRepository";

export class PrismaTiktokBaseDataRepository
  implements TiktokBaseDataRepository
{
  async createMany(data: TiktokBaseDataCreateInterface[]) {
    await prisma.tiktokBaseData.createMany({
      data,
    });

    return;
  }
}
