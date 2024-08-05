import { AiChat } from "@prisma/client";

export interface AiChatRepository {
  create(data: { name: string; userId: string }): Promise<AiChat>;
  getByUserId(userId: string): Promise<AiChat[]>;
}
