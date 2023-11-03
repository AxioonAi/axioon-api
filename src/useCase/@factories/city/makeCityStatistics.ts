import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { CityStatisticsUseCase } from "@/useCase/city/CityStatistics";

export function makeCityStatistics() {
  const userRepository = new PrismaUserRepository();
  return new CityStatisticsUseCase(userRepository);
}
