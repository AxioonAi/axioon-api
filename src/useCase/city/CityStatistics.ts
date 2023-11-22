import { UserRepository } from "@/repositories/userRepository";
import { CityDataFormatter } from "@/utils/dataFormatter/city";

interface CityStatisticsUseCaseRequest {
  userId: string;
}

interface CityStatisticsUseCaseResponse {
  city: any;
}

export class CityStatisticsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: CityStatisticsUseCaseRequest): Promise<CityStatisticsUseCaseResponse> {
    const user = await this.userRepository.findUserCity(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const formattedData = CityDataFormatter(user);

    return { city: formattedData };
  }
}
