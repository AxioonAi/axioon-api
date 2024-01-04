import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface FindPoliticianProfileNamesUseCaseRequest {}

interface FindPoliticianProfileNamesUseCaseResponse {}

export class FindPoliticianProfileNamesUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({}: FindPoliticianProfileNamesUseCaseRequest): Promise<FindPoliticianProfileNamesUseCaseResponse> {
		const names = await this.politicianProfileRepository.findNamesAndRoles();

		const formattedData: {
			id: string;
			name: string;
			social_name: string;
			role: string;
			facebook: string;
		}[] = [];

		names.forEach((user) => {
			if (
				user.id &&
				user.full_name &&
				user.social_name &&
				user.role &&
				user.facebookData.length > 0
			) {
				return formattedData.push({
					id: user.id,
					name: user.full_name,
					social_name: user.social_name,
					role: user.role,
					facebook:
						user.facebookData.length > 0 ? user.facebookData[0].title : "null",
				});
			}
		});

		return { list: formattedData };
	}
}
