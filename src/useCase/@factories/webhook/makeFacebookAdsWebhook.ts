import { AwsNotificationProductionRepository } from "@/repositories/AWS/AwsNotificationProductionRepository";
import { PrismaMetaAdvertisingLibDeliveryByRegionRepository } from "@/repositories/Prisma/PrismaMetaAdvertisingLibDeliveryByRegionRepository";
import { PrismaMetaAdvertisingLibDemographicDistributionRepository } from "@/repositories/Prisma/PrismaMetaAdvertisingLibDemographicDistributionRepository";
import { PrismaMetaAdvertisingLibRepository } from "@/repositories/Prisma/PrismaMetaAdvertisingLibRepository";
import { FacebookAdsWebhookUseCase } from "@/useCase/webhook/FacebookAdsWebhook";

export function makeFacebookAdsWebhook() {
  const awsNotificationRepository = new AwsNotificationProductionRepository();
  const metaAdvertisingLibRepository = new PrismaMetaAdvertisingLibRepository();
  const metaAdvertisingLibDeliveryByRegionRepository =
    new PrismaMetaAdvertisingLibDeliveryByRegionRepository();
  const metaAdvertisingLibDemographicDistributionRepository =
    new PrismaMetaAdvertisingLibDemographicDistributionRepository();
  return new FacebookAdsWebhookUseCase(
    awsNotificationRepository,
    metaAdvertisingLibRepository,
    metaAdvertisingLibDeliveryByRegionRepository,
    metaAdvertisingLibDemographicDistributionRepository
  );
}
