import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaInstagramEngagerRepository } from "@/repositories/Prisma/PrismaInstagramEngagerRepository";
import { PrismaInstagramHashtagMentionCommentRepository } from "@/repositories/Prisma/PrismaInstagramHashtagMentionCommentRepository";
import { PrismaInstagramHashtagMentionRepository } from "@/repositories/Prisma/PrismaInstagramHashtagMentionRepository";
import { InstagramHashtagMentionCommentsWebhookUseCase } from "@/useCase/webhook/instagramHashtagMentionsCommentsWebhook";

export function makeInstagramHashtagMentionsCommentsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const instagramHashtagMentionCommentsRepository =
    new PrismaInstagramHashtagMentionCommentRepository();
  const gptRepository = new GptProductionRepository();
  const instagramHashtagMentionRepository =
    new PrismaInstagramHashtagMentionRepository();
  const instagramEngagerRepository = new PrismaInstagramEngagerRepository();

  return new InstagramHashtagMentionCommentsWebhookUseCase(
    awsNotificationRepository,
    instagramHashtagMentionCommentsRepository,
    gptRepository,
    instagramHashtagMentionRepository,
    instagramEngagerRepository
  );
}
