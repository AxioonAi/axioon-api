import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileTiktokDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileTiktokDetails";

export function makeFindPoliticianProfileTiktokDetails() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();

  return new FindPoliticianProfileTiktokDetailsUseCase(
    politicianProfileRepository
  );
}
