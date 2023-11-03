import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { AuthenticateUserUseCase } from "@/useCase/user/AuthenticateUser";

export function makeAuthenticateUser() {
  const userRepository = new PrismaUserRepository();
  return new AuthenticateUserUseCase(userRepository);
}
