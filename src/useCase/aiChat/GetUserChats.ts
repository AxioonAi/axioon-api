import { AuthenticateError } from "@/helper/errors/AuthenticateError";
import { AiChatRepository } from "@/repositories/AiChatRepository";
import { AiMessageRepository } from "@/repositories/AiMessageRepository";
import { UserRepository } from "@/repositories/userRepository";
import { AiChat, User } from "@prisma/client";
import { compare } from "bcryptjs";
interface GetUserChatUseCaseRequest {
  userId: string;
}

interface GetUserChatUseCaseResponse {
  chat: AiChat[];
}

export class GetUserChatUseCase {
  constructor(private aiChatRepository: AiChatRepository) {}

  async execute({
    userId,
  }: GetUserChatUseCaseRequest): Promise<GetUserChatUseCaseResponse> {
    const chat = await this.aiChatRepository.getByUserId(userId);

    return { chat };
  }
}
