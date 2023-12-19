import { FacebookBaseDataCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { FacebookBaseDataRepository } from "../FacebookBaseDataRepository";

export class PrismaFacebookBaseDataRepository
  implements FacebookBaseDataRepository
{
  async createMany(data: FacebookBaseDataCreateInterface[]) {
    await prisma.facebookBaseData.createMany({
      data,
    });

    return;
  }
}
