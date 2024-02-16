import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface FindProfileWithoutYoutubeDataUseCaseResponse {
	profiles: {
		id: string;
		youtube: string | null;
	}[];
}

export class FindProfileWithoutYoutubeDataUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute(): Promise<FindProfileWithoutYoutubeDataUseCaseResponse> {
		const profiles =
			await this.politicianProfileRepository.findProfileWithoutYoutubeData();
			console.log(profiles)
		return {
			profiles: profiles.filter(
				(profile) =>
					profile.youtube !== null && profile.youtubeBaseData.length === 0,
			),
		};
	}
}
