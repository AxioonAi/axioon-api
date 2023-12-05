import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaYoutubeBaseDataRepository } from "@/repositories/Prisma/PrismaYoutubeBaseDataRepository";
import { YoutubeChannelWebhookUseCase } from "@/useCase/webhook/YoutubeChannelWebhook";

export function makeYoutubeChannelWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const youtubeChannelRepository = new PrismaYoutubeBaseDataRepository();
  return new YoutubeChannelWebhookUseCase(
    awsNotificationRepository,
    youtubeChannelRepository
  );
}
