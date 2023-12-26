import { UserNotFoundError } from "@/helper/errors/UserNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { CityDataFormatter } from "@/utils/dataFormatter/city";

interface CityStatisticsUseCaseRequest {
  userId: string;
}

interface CityStatisticsUseCaseResponse {}

export class CityStatisticsUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    userId,
  }: CityStatisticsUseCaseRequest): Promise<CityStatisticsUseCaseResponse> {
    const user = await this.politicianProfileRepository.findUserCity(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const formattedData = CityDataFormatter(user);

    return { city: formattedData };
  }
}
