import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaNewsRepository } from "@/repositories/Prisma/PrismaNewsRepository";
import { NewsWebhookUseCase } from "@/useCase/webhook/NewsWebhook";

export function makeNewsWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const gptRepository = new GptProductionRepository();
	const newsRepository = new PrismaNewsRepository();
	return new NewsWebhookUseCase(
		awsNotificationRepository,
		gptRepository,
		newsRepository,
	);
}
