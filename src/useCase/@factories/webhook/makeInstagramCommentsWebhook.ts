import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaInstagramCommentRepository } from "@/repositories/Prisma/PrismaInstagramCommentRepository";
import { PrismaInstagramPostRepository } from "@/repositories/Prisma/PrismaInstagramPostRepository";
import { InstagramCommentsWebhookUseCase } from "@/useCase/webhook/InstagramCommentsWebhook";

export function makeInstagramCommentsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const instagramPostRepository = new PrismaInstagramPostRepository();
  const instagramCommentsRepository = new PrismaInstagramCommentRepository();
  return new InstagramCommentsWebhookUseCase(
    awsNotificationRepository,
    instagramPostRepository,
    instagramCommentsRepository
  );
}
