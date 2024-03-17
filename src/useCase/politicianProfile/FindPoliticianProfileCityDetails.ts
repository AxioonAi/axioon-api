import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { UserPlanRepository } from "@/repositories/UserPlanRepository";
import { CityDataFormatter } from "@/utils/dataFormatter/city";

interface FindPoliticianProfileCityDetailsUseCaseRequest {
  id: string;
  userId: string;
}

interface FindPoliticianProfileCityDetailsUseCaseResponse {
  city: {
    id: string;
    name: string;
    state: string;
    electorate: {
      total: number;
      gender: {
        name: string;
        value: number;
      }[];
      with_disability: number;
      with_biometry: number;
      schoolLevel: {
        name: string;
        value: number;
      }[];
      ageRange: {
        name: string;
        value: number;
      }[];
    };
    population: {
      total: number;
      male: number;
      female: number;
      ageRange: {
        name: string;
        total: number;
        Homens: number;
        Mulheres: number;
      }[];
    };
    politician: number;
  };
}

export class FindPoliticianProfileCityDetailsUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository,
    private userPlanRepository: UserPlanRepository
  ) {}

  async execute({
    userId,
    id,
  }: FindPoliticianProfileCityDetailsUseCaseRequest): Promise<FindPoliticianProfileCityDetailsUseCaseResponse> {
    // const userPlan = await this.userPlanRepository.findActivePlan(userId);

    // if (!userPlan || !userPlan.plan.facebook_ads_monitoring) {
    // 	throw new UnauthorizedError();
    // }

    const user = await this.politicianProfileRepository.findUserCity(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const formattedData = CityDataFormatter(user);

    return { city: formattedData };
  }
}
