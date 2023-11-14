import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { PoliticianProfileRepository } from "../PoliticianProfileRepository";

export class PrismaPoliticianProfileRepository
  implements PoliticianProfileRepository
{
  async create(data: {
    cpf: string;
    instagram: string;
    social_name: string;
    city_id: string;
    full_name: string;
    youtube?: string;
    tiktok?: string;
    facebook?: string;
    role: Role;
    political_group_id: string;
  }) {
    return await prisma.politicianProfile.create({
      data,
    });
  }

  async findByCpf(cpf: string) {
    return await prisma.politicianProfile.findUnique({
      where: {
        cpf: cpf,
      },
    });
  }
}
