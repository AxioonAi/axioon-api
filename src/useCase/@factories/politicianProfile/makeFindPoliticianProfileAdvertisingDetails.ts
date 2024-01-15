import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileMetaAdvertisingUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileMetaAdvertising";

export function makeFindPoliticianProfileAdvertisingDetails() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindPoliticianProfileMetaAdvertisingUseCase(
		politicianProfileRepository,
	);
}
