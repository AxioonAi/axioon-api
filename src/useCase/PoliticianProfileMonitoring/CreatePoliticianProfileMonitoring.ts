import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";

interface CreatePoliticianProfileMonitoringUseCaseRequest {
	profileId: string;
	userId: string;
}

export class CreatePoliticianProfileMonitoringUseCase {
	constructor(
		private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository,
	) {}

	async execute({
		userId,
		profileId,
	}: CreatePoliticianProfileMonitoringUseCaseRequest): Promise<void> {
		await this.politicianProfileMonitoringRepository.create({
			user_id: userId,
			politician_profile_id: profileId,
		});
		return;
	}
}
