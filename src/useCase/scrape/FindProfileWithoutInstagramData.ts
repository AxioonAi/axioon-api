import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface FindProfileWithoutInstagramDataUseCaseResponse {
	profiles: {
		id: string;
		instagram: string | null;
	}[];
}

export class FindProfileWithoutInstagramDataUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute(): Promise<FindProfileWithoutInstagramDataUseCaseResponse> {
		const profiles =
			await this.politicianProfileRepository.findProfileWithoutInstagramData();

			console.log(profiles)
		return {
			profiles: profiles.filter(
				(profile) =>
					profile.instagram !== null && profile.instagramData.length === 0,
			),
		};
	}
}
