import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { WebSiteRepository } from "@/repositories/WebsiteRepository";
import { Website } from "@prisma/client";

interface GetWebsiteListUseCaseResponse {
  websites: Website[];
}

export class GetWebsiteListUseCase {
  constructor(private websiteRepository: WebSiteRepository) {}

  async execute(): Promise<GetWebsiteListUseCaseResponse> {
    const websites = await this.websiteRepository.findAll();
    return {
      websites,
    };
  }
}
