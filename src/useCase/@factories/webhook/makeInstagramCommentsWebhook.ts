import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaInstagramCommentRepository } from "@/repositories/Prisma/PrismaInstagramCommentRepository";
import { InstagramCommentsWebhookUseCase } from "@/useCase/webhook/InstagramCommentsWebhook";

export function makeInstagramCommentsWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const instagramCommentsRepository = new PrismaInstagramCommentRepository();
	const gptRepository = new GptProductionRepository();
	return new InstagramCommentsWebhookUseCase(
		awsNotificationRepository,
		instagramCommentsRepository,
		gptRepository,
	);
}
