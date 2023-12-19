import { PrismaSubUserRepository } from "@/repositories/Prisma/PrismaSubUserRepository";
import { SubUserListUseCase } from "@/useCase/subUser/SubUserList";

export function makeSubUserList() {
  const subUserRepository = new PrismaSubUserRepository();

  return new SubUserListUseCase(subUserRepository);
}
