import { PrismaAiChatRepository } from "@/repositories/Prisma/PrismaAiChatRepository";
import { GetUserChatUseCase } from "@/useCase/aiChat/GetUserChats";

export function makeGetUserChats() {
  const aiChatRepository = new PrismaAiChatRepository();

  return new GetUserChatUseCase(aiChatRepository);
}
