import { IdCerberusProductionRepository } from "@/repositories/IdCerberus/IdCerberusProductionRepository";
import { PrismaElectoralHistoryRepository } from "@/repositories/Prisma/PrismaElectoralHistoryRepository";
import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { GetInitialLegalDataUseCase } from "@/useCase/legalData/getInitialLegalData";

export function makeGetInitialLegalData() {
  const electoralHistoryRepository = new PrismaElectoralHistoryRepository();
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();
  const cerberusRepository = new IdCerberusProductionRepository();

  return new GetInitialLegalDataUseCase(
    politicianProfileRepository,
    cerberusRepository,
    electoralHistoryRepository
  );
}
