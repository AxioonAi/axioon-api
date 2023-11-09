import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { TiktokProfileWebhookUseCase } from "@/useCase/webhook/TiktokProfileWebhook";

export function makeTiktokProfileWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  return new TiktokProfileWebhookUseCase(awsNotificationRepository);
}
