import { PrismaHashtagRepository } from "@/repositories/Prisma/PrismaHashtagRepository";
import { FindHashtagMentionsUseCase } from "@/useCase/hashtag/findHashtagMentions";

export function makeFindHashtagMentions() {
  const hashtagRepository = new PrismaHashtagRepository();
  return new FindHashtagMentionsUseCase(hashtagRepository);
}
