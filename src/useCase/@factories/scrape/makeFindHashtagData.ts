import { PrismaHashtagRepository } from "@/repositories/Prisma/PrismaHashtagRepository";
import { FindHashtagDataUseCase } from "@/useCase/scrape/FindHashtagData";

export function makeFindHashtagData() {
  const hashtagRepository = new PrismaHashtagRepository();

  return new FindHashtagDataUseCase(hashtagRepository);
}
