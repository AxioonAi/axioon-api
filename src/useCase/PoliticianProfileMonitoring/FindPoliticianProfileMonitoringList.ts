import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";

interface FindPoliticianProfileMonitoringListUseCaseRequest {
  id: string;
}

interface FindPoliticianProfileMonitoringListUseCaseResponse {}

export class FindPoliticianProfileMonitoringListUseCase {
  constructor(
    private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository
  ) {}

  async execute({
    id,
  }: FindPoliticianProfileMonitoringListUseCaseRequest): Promise<FindPoliticianProfileMonitoringListUseCaseResponse> {
    const profile =
      await this.politicianProfileMonitoringRepository.findManyByUserId(id);

    const data = profile.map((profile) => {
      return {
        name: profile.politicianProfile.social_name,
        id: profile.politicianProfile.id,
        politicalGroup: profile.politicianProfile.politicalGroup.name,
      };
    });

    return {
      profile: data,
    };
  }
}
