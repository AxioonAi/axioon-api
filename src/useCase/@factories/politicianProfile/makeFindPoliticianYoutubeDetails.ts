import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileYoutubeDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileYoutubeDetails";

export function makeFindPoliticianYoutubeDetails() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindPoliticianProfileYoutubeDetailsUseCase(
		politicianProfileRepository,
	);
}
