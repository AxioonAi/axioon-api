import { PrismaFacebookPostBaseDataRepository } from "@/repositories/Prisma/PrismaFacebookPostBaseDataRepository";
import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { PrismaTiktokVideoDataRepository } from "@/repositories/Prisma/PrismaTiktokVideoDataRepository";
import { PrismaYoutubeVideoDataRepository } from "@/repositories/Prisma/PrismaYoutubeVideoDataRepository";
import { FindPoliticianProfileSocialMediaHomeDataUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileSocialMediaHomeData";

export function makeFindPoliticianProfileSocialMediaHomeData() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();
  const youtubeVideoDataRepository = new PrismaYoutubeVideoDataRepository();
  const tiktokVideoDataRepository = new PrismaTiktokVideoDataRepository();
  const facebookPostBaseDataRepository =
    new PrismaFacebookPostBaseDataRepository();
  return new FindPoliticianProfileSocialMediaHomeDataUseCase(
    politicianProfileRepository,
    youtubeVideoDataRepository,
    tiktokVideoDataRepository,
    facebookPostBaseDataRepository
  );
}
