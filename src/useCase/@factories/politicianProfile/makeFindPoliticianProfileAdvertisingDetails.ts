import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PrismaUserPlanRepository } from "@/repositories/Prisma/PrismaUserPlanRepository";
import { FindPoliticianProfileMetaAdvertisingUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileMetaAdvertising";

export function makeFindPoliticianProfileAdvertisingDetails() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	const userPlanRepository = new PrismaUserPlanRepository();
	return new FindPoliticianProfileMetaAdvertisingUseCase(
		politicianProfileRepository,
		userPlanRepository,
	);
}
