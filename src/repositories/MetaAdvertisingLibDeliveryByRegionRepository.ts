import { MetaAdvertisingLibDeliveryByRegionCreateInterface } from "@/@types/databaseInterfaces";

export interface MetaAdvertisingLibDeliveryByRegionRepository {
	createMany(
		data: MetaAdvertisingLibDeliveryByRegionCreateInterface[],
	): Promise<void>;
}
