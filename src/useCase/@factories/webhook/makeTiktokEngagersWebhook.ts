import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaTiktokEngagerRepository } from "@/repositories/Prisma/PrismaTiktokEngagerRepository";
import { TiktokEngagerWebhookUseCase } from "@/useCase/webhook/tiktokEngagerWebhook";

export function makeTiktokEngagersWebhook() {
  const awsNotificationProductionRepository =
    new AwsNotificationProductionRepository();
  const tiktokBaseDataRepository = new PrismaTiktokEngagerRepository();
  return new TiktokEngagerWebhookUseCase(
    awsNotificationProductionRepository,
    tiktokBaseDataRepository
  );
}
