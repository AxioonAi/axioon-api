import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UpdateUserAccountUseCase } from "@/useCase/user/UpdateUserAccount";

export function makeUpdateUserAccount() {
  const userRepository = new PrismaUserRepository();
  return new UpdateUserAccountUseCase(userRepository);
}
