import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindProfileWithoutFacebookDataUseCase } from "@/useCase/scrape/FindProfileWithoutFacebookData";

export function makeFindProfileWithoutFacebookData() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();
  return new FindProfileWithoutFacebookDataUseCase(politicianProfileRepository);
}
