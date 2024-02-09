import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { PoliticianProfile } from "@prisma/client";

interface PoliticianProfileExistsUseCaseRequest {
	data: {
		user_id: string;
		cpf: string;
		role: string;
		instagram: string;
		youtube?: string;
		tiktok?: string;
		facebook?: string;
		social_name: string;
		city: {
			name: string;
			state: string;
		};
		full_name: string;
		political_group_id: string;
	};
}

interface PoliticianProfileExistsUseCaseResponse {
	profile: PoliticianProfile | null;
}

export class PoliticianProfileExistsUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		data,
	}: PoliticianProfileExistsUseCaseRequest): Promise<PoliticianProfileExistsUseCaseResponse> {
		const profileExists = await this.politicianProfileRepository.profileExists({
			...data,
		});

		console.log(profileExists);
		return { profile: profileExists };
	}
}
