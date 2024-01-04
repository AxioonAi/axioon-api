import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaYoutubeVideoDataRepository } from "@/repositories/Prisma/PrismaYoutubeVideoDataRepository";
import { YoutubeWebhookUseCase } from "@/useCase/webhook/YoutubeVideoWebhook";

export function makeYoutubeVideoWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const youtubeVideoBaseDataRepository = new PrismaYoutubeVideoDataRepository();

	return new YoutubeWebhookUseCase(
		awsNotificationRepository,
		youtubeVideoBaseDataRepository,
	);
}
