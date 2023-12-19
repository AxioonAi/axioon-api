import { PrismaSubUserRepository } from "@/repositories/Prisma/PrismaSubUserRepository";
import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { CreateSubUserUseCase } from "@/useCase/subUser/CreateSubUser";

export function makeCreateSubUser() {
  const subUserRepository = new PrismaSubUserRepository();
  const userRepository = new PrismaUserRepository();

  return new CreateSubUserUseCase(subUserRepository, userRepository);
}
