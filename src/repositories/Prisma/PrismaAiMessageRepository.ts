import { prisma } from "@/lib/prisma";
import { AiMessageRepository } from "../AiMessageRepository";

export class PrismaAiMessageRepository implements AiMessageRepository {
  async create(data: { message: string; type: "USER" | "AI"; chatId: string }) {
    await prisma.aiMessage.create({
      data,
    });
  }
}
