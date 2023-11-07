import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UserInstagramListUseCase } from "@/useCase/user/UserInstagramList";

export function makeUserInstagramList() {
  const userRepository = new PrismaUserRepository();
  return new UserInstagramListUseCase(userRepository);
}
