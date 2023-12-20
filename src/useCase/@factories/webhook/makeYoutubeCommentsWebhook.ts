import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaYoutubeCommentsRepository } from "@/repositories/Prisma/PrismaYoutubeCommentsRepository";
import { YoutubeCommentsWebhookUseCase } from "@/useCase/webhook/YoutubeCommentsWebhook";

export function makeYoutubeCommentsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const youtubeCommentsRepository = new PrismaYoutubeCommentsRepository();
  const gptRepository = new GptProductionRepository();
  return new YoutubeCommentsWebhookUseCase(
    awsNotificationRepository,
    youtubeCommentsRepository,
    gptRepository
  );
}
