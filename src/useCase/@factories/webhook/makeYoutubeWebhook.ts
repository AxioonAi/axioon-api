import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { YoutubeWebhookUseCase } from "@/useCase/webhook/YoutubeWebhook";

export function makeYoutubeWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  return new YoutubeWebhookUseCase(awsNotificationRepository);
}
