import { PrismaHashtagRepository } from "@/repositories/Prisma/PrismaHashtagRepository";
import { GetHashtagListUseCase } from "@/useCase/hashtag/getHashtagList";

export function makeGetHashtagList() {
  const hashtagRepository = new PrismaHashtagRepository();

  return new GetHashtagListUseCase(hashtagRepository);
}
