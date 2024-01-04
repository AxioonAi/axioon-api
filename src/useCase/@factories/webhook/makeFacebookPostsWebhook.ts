import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaFacebookPostBaseDataRepository } from "@/repositories/Prisma/PrismaFacebookPostBaseDataRepository";
import { FacebookPostsWebhookUseCase } from "@/useCase/webhook/FacebookPostsWebhook";

export function makeFacebookPostsWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const facebookPostBaseDataRepository =
		new PrismaFacebookPostBaseDataRepository();
	return new FacebookPostsWebhookUseCase(
		awsNotificationRepository,
		facebookPostBaseDataRepository,
	);
}
