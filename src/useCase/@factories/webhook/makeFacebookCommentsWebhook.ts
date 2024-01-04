import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaFacebookCommentsRepository } from "@/repositories/Prisma/PrismaFacebookCommentsRepository";
import { FacebookCommentsWebhookUseCase } from "@/useCase/webhook/FacebookCommentsWebhook";

export function makeFacebookCommentsWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const facebookCommentsRepository = new PrismaFacebookCommentsRepository();
	const gptRepository = new GptProductionRepository();
	return new FacebookCommentsWebhookUseCase(
		awsNotificationRepository,
		facebookCommentsRepository,
		gptRepository,
	);
}
