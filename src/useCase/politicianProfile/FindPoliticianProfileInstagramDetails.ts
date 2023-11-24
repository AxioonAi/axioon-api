import { InstagramBaseDataRepository } from "@/repositories/InstagramBaseDataRepository";
import { InstagramMentionRepository } from "@/repositories/InstagramMentionRepository";
import { InstagramPostRepository } from "@/repositories/InstagramPostRepository";

interface FindPoliticianProfileInstagramDetailsUseCaseRequest {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface FindPoliticianProfileInstagramDetailsUseCaseResponse {}

export class FindPoliticianProfileInstagramDetailsUseCase {
  constructor(
    private instagramBaseDataRepository: InstagramBaseDataRepository,
    private instagramPostBaseDataRepository: InstagramPostRepository,
    private instagramMentionsRepository: InstagramMentionRepository
  ) {}

  async execute({
    id,
    startDate,
    endDate,
  }: FindPoliticianProfileInstagramDetailsUseCaseRequest): Promise<FindPoliticianProfileInstagramDetailsUseCaseResponse> {
    const [profile, mentions, posts] = await Promise.all([
      this.instagramBaseDataRepository.findDetails({ id, startDate, endDate }),
      this.instagramMentionsRepository.findDetails({ id, startDate, endDate }),
      this.instagramPostBaseDataRepository.findDetails({
        id,
        startDate,
        endDate,
      }),
    ]);

    return {
      posts,
      mentions,
      profile,
    };
  }
}
