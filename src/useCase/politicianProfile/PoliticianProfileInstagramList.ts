import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface PoliticianProfileInstagramListUseCaseRequest {}

interface PoliticianProfileInstagramListUseCaseResponse {}

export class PoliticianProfileInstagramListUseCase {
	constructor(private userRepository: PoliticianProfileRepository) {}

	async execute({}: PoliticianProfileInstagramListUseCaseRequest): Promise<PoliticianProfileInstagramListUseCaseResponse> {
		const user = await this.userRepository.findInstagramList();

		return {
			instagram: user,
		};
	}
}
