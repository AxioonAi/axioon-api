import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaInstagramMentionRepository } from "@/repositories/Prisma/PrismaInstagramMentionRepository";
import { InstagramMentionsWebhookUseCase } from "@/useCase/webhook/InstagramMentionsWebhook";

export function makeInstagramMentionsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const instagramMentionRepository = new PrismaInstagramMentionRepository();
  const gptRepository = new GptProductionRepository();
  return new InstagramMentionsWebhookUseCase(
    awsNotificationRepository,
    instagramMentionRepository,
    gptRepository
  );
}
