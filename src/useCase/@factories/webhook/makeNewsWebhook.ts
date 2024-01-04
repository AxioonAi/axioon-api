import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { NewsWebhookUseCase } from "@/useCase/webhook/NewsWebhook";

export function makeNewsWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const gptRepository = new GptProductionRepository();
	return new NewsWebhookUseCase(awsNotificationRepository, gptRepository);
}
