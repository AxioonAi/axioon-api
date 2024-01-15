import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { metaAdsFormatter } from "@/utils/dataFormatter/metaAds";

interface FindPoliticianProfileMetaAdvertisingUseCaseRequest {
	id: string;
}

interface FindPoliticianProfileMetaAdvertisingUseCaseResponse {}

export class FindPoliticianProfileMetaAdvertisingUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
	) {}

	async execute({
		id,
	}: FindPoliticianProfileMetaAdvertisingUseCaseRequest): Promise<FindPoliticianProfileMetaAdvertisingUseCaseResponse> {
		const { advertising } =
			await this.politicianProfileRepository.findMetaAdsStatistics({
				id,
			});

		const metaFormatted = metaAdsFormatter(advertising);

		return { advertising: metaFormatted };
	}
}
