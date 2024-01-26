import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PoliticianProfileExistsUseCase } from "@/useCase/politicianProfile/PoliticianProfileExists";

export function makePoliticianProfileExists() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new PoliticianProfileExistsUseCase(politicianProfileRepository);
}
