import { PrismaMetaAdvertisingLibRepository } from "@/repositories/Prisma/PrismaMetaAdvertisingLibRepository";
import { FindPoliticianProfileMetaAdvertisingUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileMetaAdvertising";

export function makeFindPoliticianProfileAdvertisingDetails() {
  const metaAdvertisingLibRepository = new PrismaMetaAdvertisingLibRepository();
  return new FindPoliticianProfileMetaAdvertisingUseCase(
    metaAdvertisingLibRepository
  );
}
