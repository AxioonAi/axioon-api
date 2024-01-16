import { UnauthorizedError } from "@/helper/errors/UnauthorizedError";
import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { UserPlanRepository } from "@/repositories/UserPlanRepository";
import { CityDataFormatter } from "@/utils/dataFormatter/city";

interface FindPoliticianProfileCityDetailsUseCaseRequest {
	id: string;
	userId: string;
}

interface FindPoliticianProfileCityDetailsUseCaseResponse {}

export class FindPoliticianProfileCityDetailsUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
		private userPlanRepository: UserPlanRepository,
	) {}

	async execute({
		userId,
		id,
	}: FindPoliticianProfileCityDetailsUseCaseRequest): Promise<FindPoliticianProfileCityDetailsUseCaseResponse> {
		const userPlan = await this.userPlanRepository.findActivePlan(userId);

		if (!userPlan || !userPlan.plan.facebook_ads_monitoring) {
			throw new UnauthorizedError();
		}
		const user = await this.politicianProfileRepository.findUserCity(id);

		if (!user) {
			throw new UserNotFoundError();
		}

		const formattedData = CityDataFormatter(user);

		return { city: formattedData };
	}
}
