import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/PrismaNotificationRepository";
import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { PrismaYoutubeBaseDataRepository } from "@/repositories/Prisma/PrismaYoutubeBaseDataRepository";
import { YoutubeChannelWebhookUseCase } from "@/useCase/webhook/YoutubeChannelWebhook";

export function makeYoutubeChannelWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const youtubeChannelRepository = new PrismaYoutubeBaseDataRepository();
  const politicianProfileMonitoringRepository =
    new PrismaPoliticianProfileMonitoringRepository();
  const notificationRepository = new PrismaNotificationRepository();
  return new YoutubeChannelWebhookUseCase(
    awsNotificationRepository,
    youtubeChannelRepository,
    politicianProfileMonitoringRepository,
    notificationRepository
  );
}
