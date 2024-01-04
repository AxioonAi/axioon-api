import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileInstagramDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileInstagramDetails";

export function makeFindPoliticianProfileInstagramDetails() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();

	return new FindPoliticianProfileInstagramDetailsUseCase(
		politicianProfileRepository,
	);
}
