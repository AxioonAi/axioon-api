import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileSocialMediaDataUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileSocialMediaData";

export function makeFindPoliticianProfileSocialMediaData() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();

  return new FindPoliticianProfileSocialMediaDataUseCase(
    politicianProfileRepository
  );
}
