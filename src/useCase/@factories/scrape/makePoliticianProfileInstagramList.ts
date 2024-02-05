import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PoliticianProfileInstagramListUseCase } from "@/useCase/scrape/PoliticianProfileInstagramList";

export function makePoliticianProfileInstagramList() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new PoliticianProfileInstagramListUseCase(politicianProfileRepository);
}
