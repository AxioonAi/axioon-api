import { prisma } from "@/lib/prisma";
import { Prisma, Status } from "@prisma/client";
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
      include: {
        signature: {
          where: {
            status: Status.ACTIVE,
            expires_in: {
              gt: new Date(),
            },
          },
          include: {
            plan: true,
          },
        },
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

  async update(
    id: string,
    data: {
      name: string;
      email?: string;
      mobilePhone?: string;
      cpfCnpj?: string;
      birthDate?: string;
      password_hash: string;
    }
  ) {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async getPlanUsage(userId: string) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        _count: {
          select: {
            hashtags: true,
            user: true,
          },
        },
        signature: {
          select: {
            plan: true,
          },
        },
      },
    });
  }
}
