import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindProfileWithoutFacebookDataUseCase } from "@/useCase/scrape/findProfileWithoutFacebookData";

export function makeFindProfileWithoutFacebookData() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindProfileWithoutFacebookDataUseCase(politicianProfileRepository);
}
