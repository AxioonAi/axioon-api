import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/PrismaNotificationRepository";
import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { PrismaTiktokBaseDataRepository } from "@/repositories/Prisma/PrismaTiktokBaseDataRepository";
import { PrismaTiktokVideoDataRepository } from "@/repositories/Prisma/PrismaTiktokVideoDataRepository";
import { TiktokProfileWebhookUseCase } from "@/useCase/webhook/TiktokProfileWebhook";

export function makeTiktokProfileWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const TiktokBaseDataRepository = new PrismaTiktokBaseDataRepository();
  const TiktokVideoDataRepository = new PrismaTiktokVideoDataRepository();
  const politicianProfileMonitoringRepository =
    new PrismaPoliticianProfileMonitoringRepository();
  const notificationRepository = new PrismaNotificationRepository();
  return new TiktokProfileWebhookUseCase(
    awsNotificationRepository,
    TiktokBaseDataRepository,
    TiktokVideoDataRepository,
    politicianProfileMonitoringRepository,
    notificationRepository
  );
}
