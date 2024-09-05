import { AiMessageRepository } from "@/repositories/AiMessageRepository";
import { AiMessage } from "@prisma/client";

interface CreateAiMessageUseCaseRequest {
  userId: string;
  chatId: string;
  message: string;
  type: "USER" | "AI";
}

interface CreateAiMessageUseCaseResponse {}

export class CreateAiMessageUseCase {
  constructor(private aiMessageRepository: AiMessageRepository) {}

  async execute({
    userId,
    message,
    chatId,
    type,
  }: CreateAiMessageUseCaseRequest): Promise<CreateAiMessageUseCaseResponse> {
    const createMessage = await this.aiMessageRepository.create({
      message,
      type,
      chatId,
    });

    return {};
  }
}
