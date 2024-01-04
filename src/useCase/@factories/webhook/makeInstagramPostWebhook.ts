import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaInstagramPostRepository } from "@/repositories/Prisma/PrismaInstagramPostRepository";
import { InstagramPostsWebhookUseCase } from "@/useCase/webhook/InstagramPostsWebhook";

export function makeInstagramPostWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const instagramPostRepository = new PrismaInstagramPostRepository();

	return new InstagramPostsWebhookUseCase(
		awsNotificationRepository,
		instagramPostRepository,
	);
}
