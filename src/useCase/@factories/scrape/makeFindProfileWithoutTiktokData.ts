import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindProfileWithoutTiktokDataUseCase } from "@/useCase/scrape/FindProfileWithoutTiktokData";

export function makeFindProfileWithoutTiktokData() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindProfileWithoutTiktokDataUseCase(politicianProfileRepository);
}
