import { PrismaFacebookBaseDataRepository } from "@/repositories/Prisma/PrismaFacebookBaseDataRepository";
import { PrismaFacebookPostBaseDataRepository } from "@/repositories/Prisma/PrismaFacebookPostBaseDataRepository";
import { FindPoliticianProfileFacebookDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileFacebookDetails";

export function makeFindPoliticianProfileFacebookDetails() {
  const facebookBaseDataRepository = new PrismaFacebookBaseDataRepository();
  const facebookPostDataRepository = new PrismaFacebookPostBaseDataRepository();
  return new FindPoliticianProfileFacebookDetailsUseCase(
    facebookBaseDataRepository,
    facebookPostDataRepository
  );
}
