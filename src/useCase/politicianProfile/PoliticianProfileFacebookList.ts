import { UserFacebookInterface } from "@/@types/politicianProfileRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface PoliticianProfileFacebookListUseCaseResponse {
	facebook: UserFacebookInterface[];
}

export class PoliticianProfileFacebookListUseCase {
	constructor(private userRepository: PoliticianProfileRepository) {}

	async execute(): Promise<PoliticianProfileFacebookListUseCaseResponse> {
		const user = await this.userRepository.findFacebookList();

		return {
			facebook: user,
		};
	}
}
