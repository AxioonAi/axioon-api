import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaTiktokEngagerRepository } from "@/repositories/Prisma/PrismaTiktokEngagerRepository";
import { PrismaTiktokHashtagMentionRepository } from "@/repositories/Prisma/PrismaTiktokHashtagMentionRepository";
import { TiktokHashtagMentionsWebhookUseCase } from "@/useCase/webhook/tiktokHashtagMentionsWebhook";

export function makeTiktokHashtagMentionsWebhook() {
  const tiktokRepository = new PrismaTiktokHashtagMentionRepository();
  const awsRepository = new AwsNotificationProductionRepository();
  const gptRepository = new GptProductionRepository();
  return new TiktokHashtagMentionsWebhookUseCase(
    awsRepository,
    tiktokRepository,
    gptRepository
  );
}
