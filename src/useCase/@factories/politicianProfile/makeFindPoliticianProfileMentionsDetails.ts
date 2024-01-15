import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileMentionsDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileMentionsDetails";

export function makeFindPoliticianProfileMentionsDetails() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindPoliticianProfileMentionsDetailsUseCase(
		politicianProfileRepository,
	);
}
