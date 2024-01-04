import { PrismaPoliticianProfileMonitoringRepository } from "@/repositories/Prisma/PrismaPoliticianProfileMonitoringRepository";
import { PrismaUserPlanRepository } from "@/repositories/Prisma/PrismaUserPlanRepository";
import { VerifyPoliticianProfileMonitoringExistUseCase } from "@/useCase/PoliticianProfileMonitoring/VerifyPoliticianProfileMonitoringExist";

export function makeVerifyPoliticianProfileMonitoringExists() {
	const politicianProfileRepository =
		new PrismaPoliticianProfileMonitoringRepository();
	const userPlanRepository = new PrismaUserPlanRepository();
	return new VerifyPoliticianProfileMonitoringExistUseCase(
		politicianProfileRepository,
		userPlanRepository,
	);
}
