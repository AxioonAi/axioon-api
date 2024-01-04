import { MetaAdvertisingLibRepository } from "@/repositories/MetaAdvertisingLibRepository";

interface FindPoliticianProfileMetaAdvertisingUseCaseRequest {
	id: string;
	startDate: Date;
	endDate: Date;
}

interface FindPoliticianProfileMetaAdvertisingUseCaseResponse {}

export class FindPoliticianProfileMetaAdvertisingUseCase {
	constructor(
		private metaAdvertisingLibRepository: MetaAdvertisingLibRepository,
	) {}

	async execute({
		id,
		startDate,
		endDate,
	}: FindPoliticianProfileMetaAdvertisingUseCaseRequest): Promise<FindPoliticianProfileMetaAdvertisingUseCaseResponse> {
		const data = await this.metaAdvertisingLibRepository.findDetails({
			id,
			startDate,
			endDate,
		});

		return { advertising: data };
	}
}
