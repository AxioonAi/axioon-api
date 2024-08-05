import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaTiktokHashtagMentionRepository } from "@/repositories/Prisma/PrismaTiktokHashtagMentionRepository";
import { PrismaTiktokHashtagMentionCommentRepository } from "@/repositories/Prisma/PrismaTiktokMentionCommentRepository";
import { TiktokHashtagMentionCommentsWebhookUseCase } from "@/useCase/webhook/TiktokHashtagMentionsCommentWebhook";

export function makeTiktokHashtagMentionCommentWebhook() {
  const tiktokMentionCommentRepository =
    new PrismaTiktokHashtagMentionCommentRepository();
  const tiktokHashtagMentionRepository =
    new PrismaTiktokHashtagMentionRepository();

  const gptRepository = new GptProductionRepository();
  const awsRepository = new AwsNotificationProductionRepository();

  return new TiktokHashtagMentionCommentsWebhookUseCase(
    awsRepository,
    tiktokMentionCommentRepository,
    gptRepository,
    tiktokHashtagMentionRepository
  );
}
