import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaInstagramMentionCommentRepository } from "@/repositories/Prisma/PrismaInstagramMentionCommentRepository";
import { PrismaInstagramMentionRepository } from "@/repositories/Prisma/PrismaInstagramMentionRepository";
import { InstagramMentionsWebhookUseCase } from "@/useCase/webhook/InstagramMentionsWebhook";

export function makeInstagramMentionsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const instagramMentionRepository = new PrismaInstagramMentionRepository();
  const instagramMentionCommentRepository =
    new PrismaInstagramMentionCommentRepository();
  return new InstagramMentionsWebhookUseCase(
    awsNotificationRepository,
    instagramMentionRepository,
    instagramMentionCommentRepository
  );
}
