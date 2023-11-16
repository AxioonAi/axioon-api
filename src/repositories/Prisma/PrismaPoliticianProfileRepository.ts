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

  async findUserCity(id: string) {
    return await prisma.politicianProfile.findUnique({
      where: {
        id,
      },
      include: {
        city: {
          include: {
            IBGEData: true,
            pollingPlace: true,
            electorate: true,
          },
        },
      },
    });
  }

  async findYoutubeChannelList() {
    return await prisma.politicianProfile.findMany({
      where: {
        youtube: {
          not: null,
        },
      },
      select: {
        youtube: true,
        id: true,
      },
    });
  }

  async findInstagramList() {
    return await prisma.politicianProfile.findMany({
      select: {
        instagram: true,
        id: true,
      },
    });
  }

  async findTikTokList() {
    return await prisma.politicianProfile.findMany({
      where: {
        tiktok: {
          not: null,
        },
      },
      select: {
        tiktok: true,
        id: true,
      },
    });
  }

  async findFacebookList() {
    return await prisma.politicianProfile.findMany({
      where: {
        facebook: {
          not: null,
        },
      },
      select: {
        facebook: true,
        id: true,
      },
    });
  }
}
