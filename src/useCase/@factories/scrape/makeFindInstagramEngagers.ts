import { PrismaInstagramEngagerRepository } from "@/repositories/Prisma/PrismaInstagramEngagerRepository";
import { FindInstagramEngagersDataUseCase } from "@/useCase/scrape/FindInstagramEngagerData";

export function makeFindInstagramEngagers() {
  const instagramEngagerRepository = new PrismaInstagramEngagerRepository();

  return new FindInstagramEngagersDataUseCase(instagramEngagerRepository);
}
