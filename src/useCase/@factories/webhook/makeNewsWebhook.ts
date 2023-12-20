import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { NewsWebhookUseCase } from "@/useCase/webhook/NewsWebhook";

export function makeNewsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  return new NewsWebhookUseCase(awsNotificationRepository);
}
