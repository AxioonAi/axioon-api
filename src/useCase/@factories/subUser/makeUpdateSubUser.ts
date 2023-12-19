import { PrismaSubUserRepository } from "@/repositories/Prisma/PrismaSubUserRepository";
import { updateSubUserUseCase } from "@/useCase/subUser/updateSubUser";

export function makeUpdateSubUser() {
  const subUserRepository = new PrismaSubUserRepository();
  return new updateSubUserUseCase(subUserRepository);
}
