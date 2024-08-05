import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaInstagramEngagerRepository } from "@/repositories/Prisma/PrismaInstagramEngagerRepository";
import { InstagramEngagerWebhookUseCase } from "@/useCase/webhook/InstagramEngagerWebhook";

export function makeInstagramEngagerWebhook() {
  const instagramEngagerRepository = new PrismaInstagramEngagerRepository();
  const awsNotificationProductionRepository =
    new AwsNotificationProductionRepository();

  return new InstagramEngagerWebhookUseCase(
    awsNotificationProductionRepository,
    instagramEngagerRepository
  );
}
