import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { FindPoliticianProfileMonitoringListUseCase } from "@/useCase/PoliticianProfileMonitoring/FindPoliticianProfileMonitoringList";

export function makeFindPoliticianProfileMonitoringList() {
	const politicianProfileMonitoringRepository =
		new PrismaPoliticianProfileMonitoringRepository();
	return new FindPoliticianProfileMonitoringListUseCase(
		politicianProfileMonitoringRepository,
	);
}
