import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { GptProductionRepository } from "@/repositories/GPT/GptProductionRepository";
import { PrismaInstagramMentionCommentRepository } from "@/repositories/Prisma/PrismaInstagramMentionCommentRepository";
import { PrismaInstagramMentionRepository } from "@/repositories/Prisma/PrismaInstagramMentionRepository";
import { InstagramMentionCommentsWebhookUseCase } from "@/useCase/webhook/InstagramMentionCommentsWebhook";

export function makeInstagramMentionsCommentsWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const instagramMentionCommentsRepository =
		new PrismaInstagramMentionCommentRepository();
	const gptRepository = new GptProductionRepository();
	const instagramMentionRepository = new PrismaInstagramMentionRepository();

	return new InstagramMentionCommentsWebhookUseCase(
		awsNotificationRepository,
		instagramMentionCommentsRepository,
		gptRepository,
		instagramMentionRepository,
	);
}
