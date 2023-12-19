import { PrismaSubUserRepository } from "@/repositories/Prisma/PrismaSubUserRepository";
import { AuthenticateSubUserUseCase } from "@/useCase/subUser/AuthenticateSubUser";

export function makeAuthenticateSubUser() {
  const subUserRepository = new PrismaSubUserRepository();
  return new AuthenticateSubUserUseCase(subUserRepository);
}
