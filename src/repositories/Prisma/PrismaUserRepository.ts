import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../userRepository";

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByCpfCnpj(cpfCnpj: string) {
    return await prisma.user.findUnique({
      where: {
        cpfCnpj: cpfCnpj,
      },
    });
  }

  async findUserCity(id: string) {
    return await prisma.user.findUnique({
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
    return await prisma.user.findMany({
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
    return await prisma.user.findMany({
      select: {
        instagram: true,
        id: true,
      },
    });
  }

  async findTikTokList() {
    return await prisma.user.findMany({
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
    return await prisma.user.findMany({
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
