import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { mentionsFormatter } from "@/utils/dataFormatter/mentions";

interface FindPoliticianProfileMentionsDetailsUseCaseRequest {
	id: string;
	period: number;
}

interface FindPoliticianProfileMentionsDetailsUseCaseResponse {}

export class FindPoliticianProfileMentionsDetailsUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
		period,
	}: FindPoliticianProfileMentionsDetailsUseCaseRequest): Promise<FindPoliticianProfileMentionsDetailsUseCaseResponse> {
		console.log(id);
		const data = await this.politicianProfileRepository.findMentionsStatistics({
			id,
			period,
		});

		const currentFormat = mentionsFormatter(data.current);

		return { currentFormat };
	}
}
