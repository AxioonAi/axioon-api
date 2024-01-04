import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PoliticianProfileFacebookListUseCase } from "@/useCase/politicianProfile/PoliticianProfileFacebookList";

export function makeFindPoliticianProfileFacebookList() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new PoliticianProfileFacebookListUseCase(politicianProfileRepository);
}
