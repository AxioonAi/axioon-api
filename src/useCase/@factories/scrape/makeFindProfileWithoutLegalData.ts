import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { findProfileWithoutLegalDataUseCase } from "@/useCase/scrape/findProfileWithoutLegalData";

export function makeFindProfileWithoutLegalData() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new findProfileWithoutLegalDataUseCase(politicianProfileRepository);
}
