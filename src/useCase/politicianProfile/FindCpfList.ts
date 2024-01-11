import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface FindCpfListUseCaseResponse {
	profiles: {
		id: string;
		cpf: string;
	}[];
}

export class FindCpfListUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute(): Promise<FindCpfListUseCaseResponse> {
		const profiles = await this.politicianProfileRepository.findCpfList();
		return {
			profiles,
		};
	}
}
