import { PrismaAiChatRepository } from "@/repositories/Prisma/PrismaAiChatRepository";
import { PrismaAiMessageRepository } from "@/repositories/Prisma/PrismaAiMessageRepository";
import { CreateAiChatUseCase } from "@/useCase/aiChat/CreateAiChat";

export function makeCreateAiChat() {
  const aiChatRepository = new PrismaAiChatRepository();
  const aiMessageRepository = new PrismaAiMessageRepository();

  return new CreateAiChatUseCase(aiChatRepository, aiMessageRepository);
}
