import { TiktokBaseDataCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { TiktokBaseDataRepository } from "../TiktokBaseDataRepository";

export class PrismaTiktokBaseDataRepository
  implements TiktokBaseDataRepository
{
  async createMany(data: TiktokBaseDataCreateInterface[]) {
    try {
      await prisma.tiktokBaseData.createMany({
        data,
      });
    } catch (error) {
      console.log("error", error);
    }

    return;
  }
}
