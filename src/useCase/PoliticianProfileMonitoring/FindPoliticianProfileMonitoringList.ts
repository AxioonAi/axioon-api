import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";

interface FindPoliticianProfileMonitoringListUseCaseRequest {
  id: string;
}

interface FindPoliticianProfileMonitoringListUseCaseResponse {
  profile: { name: string; id: string; politicalGroup: string }[];
}

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
        politicalGroup: profile.politicianProfile.politicalGroup.acronym,
        campaignNumber: profile.politicianProfile.campaign_number,
        instagram: profile.politicianProfile.instagram,
        facebook: profile.politicianProfile.facebook,
        youtube: profile.politicianProfile.youtube,
        tiktok: profile.politicianProfile.tiktok,
        cpf: profile.politicianProfile.cpf,
        city: `${profile.politicianProfile.city.name} - ${profile.politicianProfile.city.state}`,
        image:
          profile.politicianProfile.instagramData.length < 0
            ? profile.politicianProfile.instagramData[0].profilePicture
            : "",
      };
    });

    return {
      profile: data,
    };
  }
}
