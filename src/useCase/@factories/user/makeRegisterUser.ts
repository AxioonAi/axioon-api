import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UserRegisterUseCase } from "@/useCase/user/UserRegister";

export function makeRegisterUser() {
  const userRepository = new PrismaUserRepository();
  return new UserRegisterUseCase(userRepository);
}
