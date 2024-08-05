import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaInstagramEngagerRepository } from "@/repositories/Prisma/PrismaInstagramEngagerRepository";
import { PrismaInstagramHashtagMentionRepository } from "@/repositories/Prisma/PrismaInstagramHashtagMentionRepository";
import { InstagramHashtagMentionsWebhookUseCase } from "@/useCase/webhook/InstagramHashtagMentionsWebhook";

export function makeInstagramHashtagMentionsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const instagramHashtagMentionRepository =
    new PrismaInstagramHashtagMentionRepository();
  const gptRepository = new GptProductionRepository();
  const instagramEngagerRepository = new PrismaInstagramEngagerRepository();

  return new InstagramHashtagMentionsWebhookUseCase(
    awsNotificationRepository,
    instagramHashtagMentionRepository,
    gptRepository,
    instagramEngagerRepository
  );
}
