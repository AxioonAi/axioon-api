import { WebsiteCityRepository } from "@/repositories/WebsiteCityRepository";

interface FindWebsiteUserListUseCaseRequest {
  websiteId: string;
}

interface FindWebsiteUserListUseCaseResponse {
  users: {
    id: string;
    social_name: String;
  }[];
}

interface formattedUserInterface {
  id: string;
  social_name: String;
}

export class FindWebsiteUserListUseCase {
  constructor(private cityWebsiteRepository: WebsiteCityRepository) {}

  async execute({
    websiteId,
  }: FindWebsiteUserListUseCaseRequest): Promise<FindWebsiteUserListUseCaseResponse> {
    const websiteCities = await this.cityWebsiteRepository.findWebSiteUsers(
      websiteId
    );

    const formattedUsers: formattedUserInterface[] = [];

    for (const key in websiteCities) {
      const { city } = websiteCities[key];
      for (const user in city.users) {
        const { id, social_name } = city.users[user];
        formattedUsers.push({ id, social_name });
      }
    }

    return {
      users: formattedUsers,
    };
  }
}
