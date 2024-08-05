import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { TiktokEngagerRepository } from "@/repositories/TiktokEngagerRepository";

interface FindTiktokEngagersDataUseCaseResponse {
  profiles: {
    id: string;
    tiktok: string;
  }[];
}

export class FindTiktokEngagersDataUseCase {
  constructor(private tiktokEngagers: TiktokEngagerRepository) {}

  async execute(): Promise<FindTiktokEngagersDataUseCaseResponse> {
    const profiles = await this.tiktokEngagers.findScrapeProfiles();

    return {
      profiles: profiles.map((profile) => ({
        id: profile.id,
        tiktok: profile.username,
      })),
    };
  }
}
