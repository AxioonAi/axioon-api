import { PrismaElectoralHistoryRepository } from "@/repositories/Prisma/PrismaElectoralHistoryRepository";
import { GetProfileElectoralYearsUseCase } from "@/useCase/electoralHistory/getProfileElectoralYears";

export function makeGetProfileElectoralYears() {
  const electoralHistoryRepository = new PrismaElectoralHistoryRepository();
  return new GetProfileElectoralYearsUseCase(electoralHistoryRepository);
}
