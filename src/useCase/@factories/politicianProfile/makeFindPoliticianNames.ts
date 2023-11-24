import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileNamesUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileNames";

export function makeFindPoliticianNames() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();
  return new FindPoliticianProfileNamesUseCase(politicianProfileRepository);
}
