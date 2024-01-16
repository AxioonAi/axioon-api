import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileCityDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileCityDetails";

export function makeFindPoliticianProfileCityDetails() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindPoliticianProfileCityDetailsUseCase(
		politicianProfileRepository,
	);
}
