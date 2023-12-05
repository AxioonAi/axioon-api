import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaYoutubeCommentsRepository } from "@/repositories/Prisma/PrismaYoutubeCommentsRepository";
import { YoutubeCommentsWebhookUseCase } from "@/useCase/webhook/YoutubeCommentsWebhook";

export function makeYoutubeCommentsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const youtubeCommentsRepository = new PrismaYoutubeCommentsRepository();

  return new YoutubeCommentsWebhookUseCase(
    awsNotificationRepository,
    youtubeCommentsRepository
  );
}
