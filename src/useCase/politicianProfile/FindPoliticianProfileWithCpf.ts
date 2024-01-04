import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { PoliticianProfile } from "@prisma/client";

interface FindPoliticianProfileWithCpfUseCaseRequest {
	cpf: string;
}

interface FindPoliticianProfileWithCpfUseCaseResponse {
	politicianProfile: PoliticianProfile;
}

export class FindPoliticianProfileWithCpfUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		cpf,
	}: FindPoliticianProfileWithCpfUseCaseRequest): Promise<FindPoliticianProfileWithCpfUseCaseResponse> {
		const profile = await this.politicianProfileRepository.findByCpf(cpf);

		if (!profile) {
			throw new ProfileNotFoundError();
		}

		return { politicianProfile: profile };
	}
}
