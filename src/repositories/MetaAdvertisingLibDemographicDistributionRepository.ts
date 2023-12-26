import { MetaAdvertisingLibDemographicDistributionCreateInterface } from "@/@types/databaseInterfaces";

export interface MetaAdvertisingLibDemographicDistributionRepository {
  createMany(
    data: MetaAdvertisingLibDemographicDistributionCreateInterface[]
  ): Promise<void>;
}
