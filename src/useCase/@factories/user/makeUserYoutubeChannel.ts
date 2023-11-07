import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UserYoutubeChannelListUseCase } from "@/useCase/user/UserYoutubeChannelList";

export function makeUserYoutubeChannel() {
  const userRepository = new PrismaUserRepository();
  return new UserYoutubeChannelListUseCase(userRepository);
}
