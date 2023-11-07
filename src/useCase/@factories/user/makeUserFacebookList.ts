import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UserFacebookListUseCase } from "@/useCase/user/UserFacebookList";

export function makeUserFacebookList() {
  const userRepository = new PrismaUserRepository();
  return new UserFacebookListUseCase(userRepository);
}
