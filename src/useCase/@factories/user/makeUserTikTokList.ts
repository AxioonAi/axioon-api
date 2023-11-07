import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UserTikTokListUseCase } from "@/useCase/user/UserTikTokList";

export function makeUserTikTokList() {
  const userRepository = new PrismaUserRepository();
  return new UserTikTokListUseCase(userRepository);
}
