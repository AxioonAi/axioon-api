import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PrismaWebsiteRepository } from "@/repositories/Prisma/PrismaWebsiteRepository";
import { FindProfileWithoutNewsUseCase } from "@/useCase/scrape/FindProfileWithoutNews";

export function makeFindProfileWithoutNews() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	const websiteRepository = new PrismaWebsiteRepository();
	return new FindProfileWithoutNewsUseCase(
		politicianProfileRepository,
		websiteRepository,
	);
}
