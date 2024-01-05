import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaInstagramCommentRepository } from "@/repositories/Prisma/PrismaInstagramCommentRepository";
import { PrismaInstagramPostRepository } from "@/repositories/Prisma/PrismaInstagramPostRepository";
import { InstagramCommentsWebhookUseCase } from "@/useCase/webhook/InstagramCommentsWebhook";

export function makeInstagramCommentsWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const instagramCommentsRepository = new PrismaInstagramCommentRepository();
	const instagramPostRepository = new PrismaInstagramPostRepository();
	const gptRepository = new GptProductionRepository();
	return new InstagramCommentsWebhookUseCase(
		awsNotificationRepository,
		instagramCommentsRepository,
		gptRepository,
		instagramPostRepository,
	);
}
