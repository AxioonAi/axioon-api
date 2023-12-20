import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { VerifyPoliticianProfileMonitoringExistUseCase } from "@/useCase/PoliticianProfileMonitoring/VerifyPoliticianProfileMonitoringExist";

export function makeVerifyPoliticianProfileMonitoringExists() {
  const politicianProfileRepository =
    new PrismaPoliticianProfileMonitoringRepository();
  return new VerifyPoliticianProfileMonitoringExistUseCase(
    politicianProfileRepository
  );
}
