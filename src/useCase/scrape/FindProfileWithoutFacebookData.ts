import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface FindProfileWithoutFacebookDataUseCaseResponse {
  profiles: {
    id: string;
    facebook: string | null;
  }[];
}

export class FindProfileWithoutFacebookDataUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute(): Promise<FindProfileWithoutFacebookDataUseCaseResponse> {
    const profiles =
      await this.politicianProfileRepository.findProfileWithoutFacebookData();
    return {
      profiles: profiles.filter(
        (profile) =>
          profile.facebook !== null &&
          profile.facebook !== "" &&
          profile.facebookData.length === 0
      ),
    };
  }
}
