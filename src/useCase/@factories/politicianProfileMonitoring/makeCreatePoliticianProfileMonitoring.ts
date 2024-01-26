import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { CreatePoliticianProfileMonitoringUseCase } from "@/useCase/PoliticianProfileMonitoring/CreatePoliticianProfileMonitoring";

export function makeCreatePoliticianProfileMonitoring() {
	const politicianProfileMonitoringRepository =
		new PrismaPoliticianProfileMonitoringRepository();
	return new CreatePoliticianProfileMonitoringUseCase(
		politicianProfileMonitoringRepository,
	);
}
