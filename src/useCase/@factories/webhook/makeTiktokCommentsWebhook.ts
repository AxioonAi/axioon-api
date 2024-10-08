import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaTiktokCommentDataRepository } from "@/repositories/Prisma/PrismaTiktokCommentDataRepository";
import { PrismaTiktokEngagerRepository } from "@/repositories/Prisma/PrismaTiktokEngagerRepository";
import { PrismaTiktokVideoDataRepository } from "@/repositories/Prisma/PrismaTiktokVideoDataRepository";
import { TiktokCommentsWebhookUseCase } from "@/useCase/webhook/TiktokCommentsWebhook";

export function makeTiktokCommentsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const tiktokCommentsRepository = new PrismaTiktokCommentDataRepository();
  const gptRepository = new GptProductionRepository();
  const tiktokVideoRepository = new PrismaTiktokVideoDataRepository();
  const tiktokEngagerRepository = new PrismaTiktokEngagerRepository();
  return new TiktokCommentsWebhookUseCase(
    awsNotificationRepository,
    tiktokCommentsRepository,
    gptRepository,
    tiktokVideoRepository,
    tiktokEngagerRepository
  );
}
