import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaTiktokCommentDataRepository } from "@/repositories/Prisma/PrismaTiktokCommentDataRepository";
import { TiktokCommentsWebhookUseCase } from "@/useCase/webhook/TiktokCommentsWebhook";

export function makeTiktokCommentsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const tiktokCommentsRepository = new PrismaTiktokCommentDataRepository();

  return new TiktokCommentsWebhookUseCase(
    awsNotificationRepository,
    tiktokCommentsRepository
  );
}
