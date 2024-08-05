import { PrismaHashtagMonitoringRepository } from "@/repositories/Prisma/PrismaHashtagMonitoringRepository";
import { PrismaHashtagRepository } from "@/repositories/Prisma/PrismaHashtagRepository";
import { CreateHashtagUseCase } from "@/useCase/hashtag/createHashtag";

export function makeCreateHashtag() {
  const hashtagRepository = new PrismaHashtagRepository();
  const hashtagMonitoringRepository = new PrismaHashtagMonitoringRepository();

  return new CreateHashtagUseCase(
    hashtagRepository,
    hashtagMonitoringRepository
  );
}
