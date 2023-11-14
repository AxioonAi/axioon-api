import { CityNotFoundError } from "@/helper/errors/CityNotFoundError";
import { ProfileAlreadyExistsError } from "@/helper/errors/ProfileAlreadyExistsError";
import { CityRepository } from "@/repositories/CityRepository";
import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { PoliticianProfile, Role } from "@prisma/client";

interface CreatePoliticianProfileUseCaseRequest {
  data: {
    user_id: string;
    cpf: string;
    role: string;
    instagram: string;
    youtube?: string;
    tiktok?: string;
    facebook?: string;
    social_name: string;
    city: {
      name: string;
      state: string;
    };
    full_name: string;
    political_group_id: string;
  };
}

interface CreatePoliticianProfileUseCaseResponse {
  profile: PoliticianProfile;
}

export class CreatePoliticianProfileUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository,
    private cityRepository: CityRepository,
    private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository
  ) {}

  async execute({
    data,
  }: CreatePoliticianProfileUseCaseRequest): Promise<CreatePoliticianProfileUseCaseResponse> {
    const { city, role, cpf, user_id, ...rest } = data;

    const [cityExists, profileExists] = await Promise.all([
      this.cityRepository.findByNameAndState(city.name, city.state),
      this.politicianProfileRepository.findByCpf(cpf),
    ]);

    if (!cityExists) throw new CityNotFoundError();
    if (profileExists) throw new ProfileAlreadyExistsError();

    const formattedRole = role === "ALDERMAN" ? Role.ALDERMAN : Role.MAYOR;

    const profile = await this.politicianProfileRepository.create({
      ...rest,
      cpf,
      city_id: cityExists.id,
      role: formattedRole,
    });

    await this.politicianProfileMonitoringRepository.create({
      politician_profile_id: profile.id,
      user_id,
    });

    return {
      profile,
    };
  }
}
