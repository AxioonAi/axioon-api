import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface PoliticianProfileYoutubeChannelListUseCaseRequest {}

interface PoliticianProfileYoutubeChannelListUseCaseResponse {}

export class PoliticianProfileYoutubeChannelListUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({}: PoliticianProfileYoutubeChannelListUseCaseRequest): Promise<PoliticianProfileYoutubeChannelListUseCaseResponse> {
    const youtube =
      await this.politicianProfileRepository.findYoutubeChannelList();

    return {
      youtube,
    };
  }
}
