import { InstagramBaseDataCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { InstagramBaseDataRepository } from "../InstagramBaseDataRepository";

export class PrismaInstagramBaseDataRepository
  implements InstagramBaseDataRepository
{
  async createMany(data: InstagramBaseDataCreateInterface[]) {
    await prisma.instagramBaseData.createMany({
      data,
    });
  }
}
