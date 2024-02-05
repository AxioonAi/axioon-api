import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface FindPoliticianProfileNamesUseCaseResponse {
	list: {
		id: string;
		name: string;
		social_name: string;
		role: string;
		facebook: string;
	}[];
}

export class FindPoliticianProfileNamesUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute(): Promise<FindPoliticianProfileNamesUseCaseResponse> {
		const names = await this.politicianProfileRepository.findNamesAndRoles();

		const formattedData: {
			id: string;
			name: string;
			social_name: string;
			role: string;
			facebook: string;
		}[] = [];

		for (const item of names) {
			if (
				item.id &&
				item.full_name &&
				item.social_name &&
				item.role &&
				item.facebookData.length > 0
			) {
				formattedData.push({
					id: item.id,
					name: item.full_name,
					social_name: item.social_name,
					role: item.role,
					facebook:
						item.facebookData.length > 0 ? item.facebookData[0].title : "null",
				});
			}
		}

		return { list: formattedData };
	}
}
