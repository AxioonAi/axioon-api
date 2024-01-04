import { PrismaFacebookBaseDataRepository } from "@/repositories/Prisma/PrismaFacebookBaseDataRepository";
import { PrismaFacebookPostBaseDataRepository } from "@/repositories/Prisma/PrismaFacebookPostBaseDataRepository";
import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileFacebookDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileFacebookDetails";

export function makeFindPoliticianProfileFacebookDetails() {
	const facebookBaseDataRepository = new PrismaFacebookBaseDataRepository();
	const facebookPostDataRepository = new PrismaFacebookPostBaseDataRepository();
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindPoliticianProfileFacebookDetailsUseCase(
		facebookBaseDataRepository,
		facebookPostDataRepository,
		politicianProfileRepository,
	);
}
