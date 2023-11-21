import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { youtubeDataFormatter } from "@/utils/dataFormatter/youtube";

interface FindPoliticianProfileYoutubeDetailsUseCaseRequest {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface FindPoliticianProfileYoutubeDetailsUseCaseResponse {}

export class FindPoliticianProfileYoutubeDetailsUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    id,
    startDate,
    endDate,
  }: FindPoliticianProfileYoutubeDetailsUseCaseRequest): Promise<FindPoliticianProfileYoutubeDetailsUseCaseResponse> {
    const data = await this.politicianProfileRepository.findYoutubeDetails({
      id,
      startDate,
      endDate,
    });

    const format = youtubeDataFormatter(
      data.youtubeVideoData,
      data.youtubeBaseData[0].channel_total_subs
    );

    return format;
  }
}
