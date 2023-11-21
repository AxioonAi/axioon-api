import { PrismaTiktokBaseDataRepository } from "@/repositories/Prisma/PrismaTiktokBaseDataRepository";
import { PrismaTiktokVideoDataRepository } from "@/repositories/Prisma/PrismaTiktokVideoDataRepository";
import { FindPoliticianProfileTiktokDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileTiktokDetails";

export function makeFindPoliticianProfileTiktokDetails() {
  const tiktokBaseDataRepository = new PrismaTiktokBaseDataRepository();
  const tiktokVideoDataRepository = new PrismaTiktokVideoDataRepository();

  return new FindPoliticianProfileTiktokDetailsUseCase(
    tiktokBaseDataRepository,
    tiktokVideoDataRepository
  );
}
