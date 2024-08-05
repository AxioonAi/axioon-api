import { PrismaElectoralHistoryRepository } from "@/repositories/Prisma/PrismaElectoralHistoryRepository";
import { GetElectoralHistoryUseCase } from "@/useCase/electoralHistory/getElectoralHistory";

export function makeGetElectoralHistory() {
  const electoralHistoryRepository = new PrismaElectoralHistoryRepository();
  return new GetElectoralHistoryUseCase(electoralHistoryRepository);
}
