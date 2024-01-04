import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaInstagramBaseDataRepository } from "@/repositories/Prisma/PrismaInstagramBaseDataRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/PrismaNotificationRepository";
import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { InstagramProfileWebhookUseCase } from "@/useCase/webhook/InstagramProfileWebhook";

export function makeInstagramProfileWebhook() {
	const awsNotificationRepository = new AwsNotificationProductionRepository();
	const InstagramBaseDataRepository = new PrismaInstagramBaseDataRepository();
	const politicianProfileMonitoringRepository =
		new PrismaPoliticianProfileMonitoringRepository();
	const notificationRepository = new PrismaNotificationRepository();
	return new InstagramProfileWebhookUseCase(
		awsNotificationRepository,
		InstagramBaseDataRepository,
		politicianProfileMonitoringRepository,
		notificationRepository,
	);
}
