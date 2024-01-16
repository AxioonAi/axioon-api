import { UnauthorizedError } from "@/helper/errors/UnauthorizedError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { UserPlanRepository } from "@/repositories/UserPlanRepository";
import { metaAdsFormatter } from "@/utils/dataFormatter/metaAds";

interface FindPoliticianProfileMetaAdvertisingUseCaseRequest {
	id: string;
	userId: string;
}

interface FindPoliticianProfileMetaAdvertisingUseCaseResponse {}

export class FindPoliticianProfileMetaAdvertisingUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
		private userPlanRepository: UserPlanRepository,
	) {}

	async execute({
		id,
		userId,
	}: FindPoliticianProfileMetaAdvertisingUseCaseRequest): Promise<FindPoliticianProfileMetaAdvertisingUseCaseResponse> {
		const userPlan = await this.userPlanRepository.findActivePlan(userId);

		if (!userPlan || !userPlan.plan.facebook_ads_monitoring) {
			throw new UnauthorizedError();
		}

		const { advertising } =
			await this.politicianProfileRepository.findMetaAdsStatistics(id);

		const metaFormatted = metaAdsFormatter(advertising);

		return { advertising: metaFormatted };
	}
}
