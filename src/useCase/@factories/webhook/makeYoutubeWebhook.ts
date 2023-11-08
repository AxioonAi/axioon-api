import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaYoutubeBaseDataRepository } from "@/repositories/Prisma/PrismaYoutubeBaseDataRepository";
import { PrismaYoutubeVideoDataRepository } from "@/repositories/Prisma/PrismaYoutubeVideoDataRepository";
import { YoutubeWebhookUseCase } from "@/useCase/webhook/YoutubeWebhook";

export function makeYoutubeWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const youtubeBaseDataRepository = new PrismaYoutubeBaseDataRepository();
  const youtubeVideoBaseDataRepository = new PrismaYoutubeVideoDataRepository();

  return new YoutubeWebhookUseCase(
    awsNotificationRepository,
    youtubeBaseDataRepository,
    youtubeVideoBaseDataRepository
  );
}
