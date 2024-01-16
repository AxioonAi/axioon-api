import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PrismaUserPlanRepository } from "@/repositories/Prisma/PrismaUserPlanRepository";
import { FindPoliticianProfileCityDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileCityDetails";

export function makeFindPoliticianProfileCityDetails() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	const userPlanRepository = new PrismaUserPlanRepository();
	return new FindPoliticianProfileCityDetailsUseCase(
		politicianProfileRepository,
		userPlanRepository,
	);
}
