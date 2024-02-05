import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PoliticianProfileTikTokListUseCase } from "@/useCase/scrape/PoliticianProfileTikTokList";

export function makePoliticianProfileTiktokList() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new PoliticianProfileTikTokListUseCase(politicianProfileRepository);
}
