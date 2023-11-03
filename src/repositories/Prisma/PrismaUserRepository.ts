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
          },
        },
      },
    });
  }
}
