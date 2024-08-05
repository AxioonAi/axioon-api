import { prisma } from "@/lib/prisma";
import { AiChatRepository } from "../AiChatRepository";

export class PrismaAiChatRepository implements AiChatRepository {
  async create(data: { name: string; userId: string }) {
    return await prisma.aiChat.create({ data });
  }
  async getByUserId(userId: string) {
    return await prisma.aiChat.findMany({
      where: { userId },
      include: { messages: true },
    });
  }
}
