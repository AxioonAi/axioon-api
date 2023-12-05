import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaInstagramCommentRepository } from "@/repositories/Prisma/PrismaInstagramCommentRepository";
import { InstagramCommentsWebhookUseCase } from "@/useCase/webhook/InstagramCommentsWebhook";

export function makeInstagramCommentsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const instagramCommentsRepository = new PrismaInstagramCommentRepository();
  return new InstagramCommentsWebhookUseCase(
    awsNotificationRepository,
    instagramCommentsRepository
  );
}
