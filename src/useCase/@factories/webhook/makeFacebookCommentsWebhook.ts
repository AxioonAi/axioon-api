import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaFacebookCommentsRepository } from "@/repositories/Prisma/PrismaFacebookCommentsRepository";
import { FacebookCommentsWebhookUseCase } from "@/useCase/webhook/FacebookCommentsWebhook";

export function makeFacebookCommentsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const facebookCommentsRepository = new PrismaFacebookCommentsRepository();
  return new FacebookCommentsWebhookUseCase(
    awsNotificationRepository,
    facebookCommentsRepository
  );
}
