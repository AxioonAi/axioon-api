import { UserRepository } from "@/repositories/userRepository";
import { City } from "@prisma/client";

interface CityStatisticsUseCaseRequest {
  userId: string;
}

interface CityStatisticsUseCaseResponse {
  city: City;
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

    return { city: user.city };
  }
}
