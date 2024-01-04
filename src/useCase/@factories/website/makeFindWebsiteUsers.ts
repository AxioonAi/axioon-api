import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PrismaWebsiteRepository } from "@/repositories/Prisma/PrismaWebsiteRepository";
import { FindWebsiteUsersUseCase } from "@/useCase/website/FindWebsiteUsers";

export function makeFindWebsiteUsers() {
	const websiteRepository = new PrismaWebsiteRepository();
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindWebsiteUsersUseCase(
		websiteRepository,
		politicianProfileRepository,
	);
}
