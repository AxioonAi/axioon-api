import { AuthenticateError } from "@/helper/errors/AuthenticateError";
import { AiChatRepository } from "@/repositories/AiChatRepository";
import { AiMessageRepository } from "@/repositories/AiMessageRepository";
import { UserRepository } from "@/repositories/userRepository";
import { AiChat, User } from "@prisma/client";
import { compare } from "bcryptjs";
interface CreateAiChatUseCaseRequest {
  userId: string;
  message: string;
  name: string;
}

interface CreateAiChatUseCaseResponse {
  chat: AiChat;
}

export class CreateAiChatUseCase {
  constructor(
    private aiChatRepository: AiChatRepository,
    private aiMessageRepository: AiMessageRepository
  ) {}

  async execute({
    userId,
    message,
    name,
  }: CreateAiChatUseCaseRequest): Promise<CreateAiChatUseCaseResponse> {
    const chat = await this.aiChatRepository.create({ name, userId });

    const createMessage = await this.aiMessageRepository.create({
      message,
      type: "USER",
      chatId: chat.id,
    });

    return { chat };
  }
}
