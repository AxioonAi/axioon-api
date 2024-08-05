import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { InstagramEngagerRepository } from "@/repositories/instagramEngagerRepository";

interface FindInstagramEngagersDataUseCaseResponse {
  profiles: {
    id: string;
    instagram: string;
  }[];
}

export class FindInstagramEngagersDataUseCase {
  constructor(private instagramEngagers: InstagramEngagerRepository) {}

  async execute(): Promise<FindInstagramEngagersDataUseCaseResponse> {
    const profiles = await this.instagramEngagers.findScrapeProfiles();

    return {
      profiles: profiles.map((profile) => ({
        id: profile.id,
        instagram: profile.username,
      })),
    };
  }
}
