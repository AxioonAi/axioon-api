import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaFacebookBaseDataRepository } from "@/repositories/Prisma/PrismaFacebookBaseDataRepository";
import { FacebookWebhookUseCase } from "@/useCase/webhook/FacebookWebhook";

export function makeFacebookWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const facebookBaseDataRepository = new PrismaFacebookBaseDataRepository();
  return new FacebookWebhookUseCase(
    awsNotificationRepository,
    facebookBaseDataRepository
  );
}
