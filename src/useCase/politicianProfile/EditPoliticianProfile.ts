import { CityNotFoundError } from "@/helper/errors/CityNotFoundError";
import { ProfileAlreadyExistsError } from "@/helper/errors/ProfileAlreadyExistsError";
import { CityRepository } from "@/repositories/CityRepository";
import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { PoliticianProfile, Role } from "@prisma/client";

interface EditPoliticianProfileUseCaseRequest {
  profileId: string;
  cpf?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  facebook?: string;
  social_name?: string;
  campaign_name?: string;
  full_name?: string;
}

interface EditPoliticianProfileUseCaseResponse {
  profile: PoliticianProfile;
}

export class EditPoliticianProfileUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    profileId,
    ...rest
  }: EditPoliticianProfileUseCaseRequest): Promise<EditPoliticianProfileUseCaseResponse> {
    const profileExists = await this.politicianProfileRepository.findById(
      profileId
    );
    if (!profileExists) {
      throw new ProfileAlreadyExistsError();
    }

    const profile = await this.politicianProfileRepository.update(
      profileId,
      rest
    );

    return {
      profile,
    };
  }
}
