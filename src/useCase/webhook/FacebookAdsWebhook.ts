import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { MetaAdvertisingLibDeliveryByRegionRepository } from "@/repositories/MetaAdvertisingLibDeliveryByRegionRepository";
import { MetaAdvertisingLibDemographicDistributionRepository } from "@/repositories/MetaAdvertisingLibDemographicDistributionRepository";
import { MetaAdvertisingLibRepository } from "@/repositories/MetaAdvertisingLibRepository";

interface FacebookAdsWebhookUseCaseRequest {
	records: {
		s3: {
			object: {
				key: string;
			};
		};
	}[];
}

export class FacebookAdsWebhookUseCase {
	constructor(
		private awsNotificationRepository: AwsNotificationRepository,
		private metaAdvertisingLibRepository: MetaAdvertisingLibRepository,
		private metaAdvertisingLibDeliveryByRegionRepository: MetaAdvertisingLibDeliveryByRegionRepository,
		private metaAdvertisingLibDemographicDistributionRepository: MetaAdvertisingLibDemographicDistributionRepository,
	) {}

	async execute({ records }: FacebookAdsWebhookUseCaseRequest): Promise<void> {
		const { advertisingData, deliveryRegionData, demographicDistributionData } =
			await this.awsNotificationRepository.S3FacebookAdsNotification({
				records,
			});

		await this.metaAdvertisingLibRepository.createMany(advertisingData);
		await this.metaAdvertisingLibDeliveryByRegionRepository.createMany(
			deliveryRegionData,
		);
		await this.metaAdvertisingLibDemographicDistributionRepository.createMany(
			demographicDistributionData,
		);
		return;
	}
}
