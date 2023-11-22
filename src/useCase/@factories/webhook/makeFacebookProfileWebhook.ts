import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaFacebookBaseDataRepository } from "@/repositories/Prisma/PrismaFacebookBaseDataRepository";
import { FacebookProfileWebhookUseCase } from "@/useCase/webhook/FacebookProfileWebhook";

export function makeFacebookProfileWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const facebookBaseDataRepository = new PrismaFacebookBaseDataRepository();
  return new FacebookProfileWebhookUseCase(
    awsNotificationRepository,
    facebookBaseDataRepository
  );
}
