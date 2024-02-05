import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface findProfileWithoutLegalDataUseCaseResponse {
	profiles: {
		id: string;
		cpf: string | null;
	}[];
}

export class findProfileWithoutLegalDataUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute(): Promise<findProfileWithoutLegalDataUseCaseResponse> {
		const profiles =
			await this.politicianProfileRepository.findProfileWithoutLegalData();

		return {
			profiles: profiles.filter(
				(profile) => profile.cpf === null && profile.legalData.length === 0,
			),
		};
	}
}
