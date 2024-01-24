import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface FindPoliticianProfileLegalDetailsUseCaseRequest {
	id: string;
}

interface FindPoliticianProfileLegalDetailsUseCaseResponse {
	politicianProfile: any;
}

export class FindPoliticianProfileLegalDetailsUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
	}: FindPoliticianProfileLegalDetailsUseCaseRequest): Promise<FindPoliticianProfileLegalDetailsUseCaseResponse> {
		const politicianProfile =
			await this.politicianProfileRepository.findLegalDetails(id);

		return {
			politicianProfile,
		};
	}
}
