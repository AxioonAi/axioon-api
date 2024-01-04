import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { CityStatisticsUseCase } from "@/useCase/city/CityStatistics";

export function makeCityStatistics() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new CityStatisticsUseCase(politicianProfileRepository);
}
