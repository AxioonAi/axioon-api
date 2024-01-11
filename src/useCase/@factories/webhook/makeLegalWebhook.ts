import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaLegalDataRepository } from "@/repositories/Prisma/PrismaLegalDataRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/PrismaNotificationRepository";
import { LegalWebhookUseCase } from "@/useCase/webhook/LegalWebhook";

export function makeLegalWebhook() {
	const awsNotificationInterface = new AwsNotificationProductionRepository();
	const legalDataRepository = new PrismaLegalDataRepository();
	const notificationRepository = new PrismaNotificationRepository();
	return new LegalWebhookUseCase(
		awsNotificationInterface,
		notificationRepository,
		legalDataRepository,
	);
}
