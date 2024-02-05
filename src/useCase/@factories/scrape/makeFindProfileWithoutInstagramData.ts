import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindProfileWithoutInstagramDataUseCase } from "@/useCase/scrape/FindProfileWithoutInstagramData";

export function makeFindProfileWithoutInstagramData() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindProfileWithoutInstagramDataUseCase(
		politicianProfileRepository,
	);
}
