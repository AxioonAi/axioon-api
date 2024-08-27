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

    const filteredProfiles = profiles
      .map((profile) => ({
        id: profile.id,
        instagram: profile.username,
      }))
      .reduce((acc: { id: string; instagram: string }[], current) => {
        const duplicate = acc.find(
          (profile) => profile.instagram === current.instagram
        );
        if (!duplicate) {
          acc.push(current);
        }
        return acc;
      }, []);

    return {
      profiles: filteredProfiles,
    };
  }
}
