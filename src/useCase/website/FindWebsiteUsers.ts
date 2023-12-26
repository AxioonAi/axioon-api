import { WebsiteNotFoundError } from "@/helper/errors/WebsiteNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { WebSiteRepository } from "@/repositories/WebsiteRepository";

interface FindWebsiteUsersUseCaseRequest {
  id: string;
}

interface FindWebsiteUsersUseCaseResponse {}

export class FindWebsiteUsersUseCase {
  constructor(
    private websiteRepository: WebSiteRepository,
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    id,
  }: FindWebsiteUsersUseCaseRequest): Promise<FindWebsiteUsersUseCaseResponse> {
    const website = await this.websiteRepository.findById(id);

    if (!website) throw new WebsiteNotFoundError();

    const users = await this.politicianProfileRepository.findByState(
      website.city.state
    );

    return { users };
  }
}
