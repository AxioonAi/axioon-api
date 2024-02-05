import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PoliticianProfileYoutubeChannelListUseCase } from "@/useCase/scrape/PoliticianProfileYoutubeChannelList";

export function makePoliticianProfileYoutubeChannelList() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new PoliticianProfileYoutubeChannelListUseCase(
		politicianProfileRepository,
	);
}
