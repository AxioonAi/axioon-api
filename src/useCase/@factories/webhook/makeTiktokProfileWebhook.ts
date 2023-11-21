import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaTiktokBaseDataRepository } from "@/repositories/Prisma/PrismaTiktokBaseDataRepository";
import { PrismaTiktokVideoDataRepository } from "@/repositories/Prisma/PrismaTiktokVideoDataRepository";
import { TiktokProfileWebhookUseCase } from "@/useCase/webhook/TiktokProfileWebhook";

export function makeTiktokProfileWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const TiktokBaseDataRepository = new PrismaTiktokBaseDataRepository();
  const TiktokVideoDataRepository = new PrismaTiktokVideoDataRepository();
  return new TiktokProfileWebhookUseCase(
    awsNotificationRepository,
    TiktokBaseDataRepository,
    TiktokVideoDataRepository
  );
}
