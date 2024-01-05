import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaYoutubeCommentsRepository } from "@/repositories/Prisma/PrismaYoutubeCommentsRepository";
import { PrismaYoutubeVideoDataRepository } from "@/repositories/Prisma/PrismaYoutubeVideoDataRepository";
import { YoutubeCommentsWebhookUseCase } from "@/useCase/webhook/YoutubeCommentsWebhook";

export function makeYoutubeCommentsWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const youtubeCommentsRepository = new PrismaYoutubeCommentsRepository();
	const gptRepository = new GptProductionRepository();
	const youtubeVideoRepository = new PrismaYoutubeVideoDataRepository();
	return new YoutubeCommentsWebhookUseCase(
		awsNotificationRepository,
		youtubeCommentsRepository,
		gptRepository,
		youtubeVideoRepository,
	);
}
