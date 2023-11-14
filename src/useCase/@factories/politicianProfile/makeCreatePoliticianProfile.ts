import { PrismaCityRepository } from "@/repositories/Prisma/PrismaCityRepository";
import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { CreatePoliticianProfileUseCase } from "@/useCase/politicianProfile/CreatePoliticianProfile";

export function makeCreatePoliticianProfile() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();
  const cityRepository = new PrismaCityRepository();
  const monitoringRepository =
    new PrismaPoliticianProfileMonitoringRepository();
  return new CreatePoliticianProfileUseCase(
    politicianProfileRepository,
    cityRepository,
    monitoringRepository
  );
}
