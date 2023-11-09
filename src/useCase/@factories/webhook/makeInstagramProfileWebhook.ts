import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaInstagramBaseDataRepository } from "@/repositories/Prisma/PrismaInstagramBaseDataRepository";
import { InstagramProfileWebhookUseCase } from "@/useCase/webhook/InstagramProfileWebhook";

export function makeInstagramProfileWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const InstagramBaseDataRepository = new PrismaInstagramBaseDataRepository();
  return new InstagramProfileWebhookUseCase(
    awsNotificationRepository,
    InstagramBaseDataRepository
  );
}
