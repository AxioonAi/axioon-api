import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindProfileWithoutYoutubeDataUseCase } from "@/useCase/scrape/FindProfileWithoutYoutubeData";

export function makeFindProfileWithoutYoutubeData() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindProfileWithoutYoutubeDataUseCase(politicianProfileRepository);
}
