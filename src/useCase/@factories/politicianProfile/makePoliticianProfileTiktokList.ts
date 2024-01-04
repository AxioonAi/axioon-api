import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PoliticianProfileTikTokListUseCase } from "@/useCase/politicianProfile/PoliticianProfileTikTokList";

export function makePoliticianProfileTiktokList() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new PoliticianProfileTikTokListUseCase(politicianProfileRepository);
}
