import { PrismaAiMessageRepository } from "@/repositories/Prisma/PrismaAiMessageRepository";
import { CreateAiMessageUseCase } from "@/useCase/aiChat/CreateChatMessage";

export function makeCreateAiMessage() {
  const aiMessageRepository = new PrismaAiMessageRepository();

  return new CreateAiMessageUseCase(aiMessageRepository);
}
