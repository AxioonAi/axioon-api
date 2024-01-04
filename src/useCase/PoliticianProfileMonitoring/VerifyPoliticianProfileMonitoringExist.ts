import { MonitoringNotFoundError } from "@/helper/errors/MonitoringNotFoundError";
import { SignatureNotFoundError } from "@/helper/errors/SignatureNotFoundError";
import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";
import { UserPlanRepository } from "@/repositories/UserPlanRepository";

interface VerifyPoliticianProfileMonitoringExistUseCaseRequest {
	id: string;
	profileId: string;
}

export class VerifyPoliticianProfileMonitoringExistUseCase {
	constructor(
		private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository,
		private userPlanRepository: UserPlanRepository,
	) {}

	async execute({
		id,
		profileId,
	}: VerifyPoliticianProfileMonitoringExistUseCaseRequest): Promise<void> {
		const [exists, activePlan] = await Promise.all([
			this.politicianProfileMonitoringRepository.verify({
				profileId,
				userId: id,
			}),
			this.userPlanRepository.findActivePlan(id),
		]);

		if (!exists) {
			throw new MonitoringNotFoundError();
		}

		if (!activePlan) {
			throw new SignatureNotFoundError();
		}

		return;
	}
}
