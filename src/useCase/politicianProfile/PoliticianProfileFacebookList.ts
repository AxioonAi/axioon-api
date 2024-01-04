import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface PoliticianProfileFacebookListUseCaseRequest {}

interface PoliticianProfileFacebookListUseCaseResponse {}

export class PoliticianProfileFacebookListUseCase {
	constructor(private userRepository: PoliticianProfileRepository) {}

	async execute({}: PoliticianProfileFacebookListUseCaseRequest): Promise<PoliticianProfileFacebookListUseCaseResponse> {
		const user = await this.userRepository.findFacebookList();

		return {
			facebook: user,
		};
	}
}
