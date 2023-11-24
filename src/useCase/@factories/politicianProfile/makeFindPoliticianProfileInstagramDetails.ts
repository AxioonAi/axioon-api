import { PrismaInstagramBaseDataRepository } from "@/repositories/Prisma/PrismaInstagramBaseDataRepository";
import { PrismaInstagramMentionRepository } from "@/repositories/Prisma/PrismaInstagramMentionRepository";
import { PrismaInstagramPostRepository } from "@/repositories/Prisma/PrismaInstagramPostRepository";
import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileInstagramDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileInstagramDetails";

export function makeFindPoliticianProfileInstagramDetails() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();
  const instagramPostRepository = new PrismaInstagramPostRepository();
  const instagramBaseDataRepository = new PrismaInstagramBaseDataRepository();
  const instagramMentionRepository = new PrismaInstagramMentionRepository();

  return new FindPoliticianProfileInstagramDetailsUseCase(
    instagramBaseDataRepository,
    instagramPostRepository,
    instagramMentionRepository
  );
}
