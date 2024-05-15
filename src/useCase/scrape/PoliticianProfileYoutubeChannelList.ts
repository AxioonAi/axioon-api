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
      youtube: youtube
        .map((item) => {
          if (item.youtube !== null && item.youtube !== "") {
            return {
              id: item.id,
              youtube: item.youtube,
            };
          }
        })
        .filter((item) => item !== undefined) as UserYoutubeChannelInterface[],
    };
  }
}
