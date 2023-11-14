import { prisma } from "@/lib/prisma";
import { PoliticalGroupRepository } from "../PoliticalGroupRepository";

export class PrismaPoliticalGroupRepository
  implements PoliticalGroupRepository
{
  async findById(id: string) {
    return await prisma.politicalGroup.findUnique({
      where: {
        id,
      },
    });
  }

  async findMany() {
    return await prisma.politicalGroup.findMany();
  }
}
