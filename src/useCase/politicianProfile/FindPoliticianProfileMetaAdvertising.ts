import { UnauthorizedError } from "@/helper/errors/UnauthorizedError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { UserPlanRepository } from "@/repositories/UserPlanRepository";
import { metaAdsFormatter } from "@/utils/dataFormatter/metaAds";

interface FindPoliticianProfileMetaAdvertisingUseCaseRequest {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

interface FindPoliticianProfileMetaAdvertisingUseCaseResponse {
  advertising:
    | {
        public_by_gender: { [key: string]: number };
        public_by_age_and_gender: {
          [key: string]: { [key: string]: number };
        };
        ads: {
          id: string;
          average_impressions: number;
          average_spend: number;
          start_date: Date;
          end_date: Date | null;
          status: string;
        }[];
      }
    | {};
}

export class FindPoliticianProfileMetaAdvertisingUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository,
    private userPlanRepository: UserPlanRepository
  ) {}

  async execute({
    id,
    userId,
    startDate,
    endDate,
  }: FindPoliticianProfileMetaAdvertisingUseCaseRequest): Promise<FindPoliticianProfileMetaAdvertisingUseCaseResponse> {
    // const userPlan = await this.userPlanRepository.findActivePlan(userId);

    // if (!userPlan || !userPlan.plan.facebook_ads_monitoring) {
    //   throw new UnauthorizedError();
    // }

    const ads = await this.politicianProfileRepository.findMetaAdsStatistics({
      id,
      gte: startDate,
      lte: endDate,
    });

    if (!ads) {
      return { advertising: {} };
    }

    const metaFormatted = metaAdsFormatter(ads.advertising);

    return { advertising: metaFormatted };
  }
}
