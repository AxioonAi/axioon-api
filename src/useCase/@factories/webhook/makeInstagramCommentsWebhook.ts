import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaInstagramCommentRepository } from "@/repositories/Prisma/PrismaInstagramCommentRepository";
import { PrismaInstagramEngagerRepository } from "@/repositories/Prisma/PrismaInstagramEngagerRepository";
import { PrismaInstagramPostRepository } from "@/repositories/Prisma/PrismaInstagramPostRepository";
import { InstagramCommentsWebhookUseCase } from "@/useCase/webhook/InstagramCommentsWebhook";

export function makeInstagramCommentsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const instagramCommentsRepository = new PrismaInstagramCommentRepository();
  const instagramPostRepository = new PrismaInstagramPostRepository();
  const instagramEngagerRepository = new PrismaInstagramEngagerRepository();
  const gptRepository = new GptProductionRepository();
  return new InstagramCommentsWebhookUseCase(
    awsNotificationRepository,
    instagramCommentsRepository,
    gptRepository,
    instagramPostRepository,
    instagramEngagerRepository
  );
}
