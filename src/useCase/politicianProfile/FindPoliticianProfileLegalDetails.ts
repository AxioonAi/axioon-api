import { LegalDetailsData } from "@/@types/politicianProfileRepository";
import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface FindPoliticianProfileLegalDetailsUseCaseRequest {
	id: string;
}

interface FindPoliticianProfileLegalDetailsUseCaseResponse {
	politicianProfile: LegalDetailsData;
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

		if (!politicianProfile) throw new ProfileNotFoundError();

		return {
			politicianProfile,
		};
	}
}
