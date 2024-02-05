import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface FindProfileWithoutTiktokDataUseCaseResponse {
	profiles: {
		id: string;
		tiktok: string | null;
	}[];
}

export class FindProfileWithoutTiktokDataUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute(): Promise<FindProfileWithoutTiktokDataUseCaseResponse> {
		const profiles =
			await this.politicianProfileRepository.findProfileWithoutTiktokData();
		return {
			profiles: profiles.filter(
				(profile) => profile.tiktok === null && profile.tiktokData.length === 0,
			),
		};
	}
}
