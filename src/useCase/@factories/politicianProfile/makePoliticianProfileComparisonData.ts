import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PoliticianProfileComparisonDataUseCase } from "@/useCase/politicianProfile/PoliticianProfileComparisonData";

export function makePoliticianProfileComparisonData() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();
  return new PoliticianProfileComparisonDataUseCase(
    politicianProfileRepository
  );
}
