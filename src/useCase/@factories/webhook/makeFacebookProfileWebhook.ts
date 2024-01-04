import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaFacebookBaseDataRepository } from "@/repositories/Prisma/PrismaFacebookBaseDataRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/PrismaNotificationRepository";
import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { FacebookProfileWebhookUseCase } from "@/useCase/webhook/FacebookProfileWebhook";

export function makeFacebookProfileWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const facebookBaseDataRepository = new PrismaFacebookBaseDataRepository();
	const politicianProfileMonitoringRepository =
		new PrismaPoliticianProfileMonitoringRepository();
	const notificationRepository = new PrismaNotificationRepository();

	return new FacebookProfileWebhookUseCase(
		awsNotificationRepository,
		facebookBaseDataRepository,
		politicianProfileMonitoringRepository,
		notificationRepository,
	);
}
