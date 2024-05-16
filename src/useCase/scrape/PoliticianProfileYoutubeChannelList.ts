import { UserYoutubeChannelInterface } from "@/@types/politicianProfileRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface PoliticianProfileYoutubeChannelListUseCaseResponse {
  youtube: UserYoutubeChannelInterface[];
}

export class PoliticianProfileYoutubeChannelListUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute(): Promise<PoliticianProfileYoutubeChannelListUseCaseResponse> {
    const youtube =
      await this.politicianProfileRepository.findYoutubeChannelList();

    return {
      youtube: youtube.filter(
        (item) => item.youtube !== ""
      ) as UserYoutubeChannelInterface[],
    };
  }
}
