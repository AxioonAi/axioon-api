import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { RemovePoliticianProfileMonitoringUseCase } from "@/useCase/PoliticianProfileMonitoring/RemoveProfileMonitoring";

export function makeRemoveProfileMonitoring() {
  const politicianProfileMonitoringRepository =
    new PrismaPoliticianProfileMonitoringRepository();

  return new RemovePoliticianProfileMonitoringUseCase(
    politicianProfileMonitoringRepository
  );
}
