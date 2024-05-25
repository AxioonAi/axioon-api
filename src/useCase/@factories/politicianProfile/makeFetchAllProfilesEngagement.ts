import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FetchAllProfilesEngagementUseCase } from "@/useCase/politicianProfile/FetchAllProfilesEngagement";

export function makeFetchAllProfilesEngagement() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();
  const politicianProfileMonitoring =
    new PrismaPoliticianProfileMonitoringRepository();
  return new FetchAllProfilesEngagementUseCase(
    politicianProfileRepository,
    politicianProfileMonitoring
  );
}
