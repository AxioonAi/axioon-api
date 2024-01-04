import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaTiktokCommentDataRepository } from "@/repositories/Prisma/PrismaTiktokCommentDataRepository";
import { TiktokCommentsWebhookUseCase } from "@/useCase/webhook/TiktokCommentsWebhook";

export function makeTiktokCommentsWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const tiktokCommentsRepository = new PrismaTiktokCommentDataRepository();
	const gptRepository = new GptProductionRepository();
	return new TiktokCommentsWebhookUseCase(
		awsNotificationRepository,
		tiktokCommentsRepository,
		gptRepository,
	);
}
