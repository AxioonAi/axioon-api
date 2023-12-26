import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { youtubeDataFormatter } from "@/utils/dataFormatter/youtube";

interface FindPoliticianProfileYoutubeDetailsUseCaseRequest {
  id: string;
  period: number;
}

interface FindPoliticianProfileYoutubeDetailsUseCaseResponse {}

export class FindPoliticianProfileYoutubeDetailsUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    id,
    period,
  }: FindPoliticianProfileYoutubeDetailsUseCaseRequest): Promise<FindPoliticianProfileYoutubeDetailsUseCaseResponse> {
    const { current, previous } =
      await this.politicianProfileRepository.findYoutubeStatistics({
        id,
        period,
      });

    const formatCurrent = !current ? null : youtubeDataFormatter(current);
    const formatPrevious = !previous ? null : youtubeDataFormatter(previous);

    const finalStatistics = {
      keyIndicators: {
        current: !formatCurrent ? null : formatCurrent.videoEngagementData,
        previous: !formatPrevious ? null : formatPrevious.videoEngagementData,
      },
      commentsStatistics: !formatCurrent
        ? null
        : formatCurrent.commentsStatistics,
      posts: !formatPrevious ? null : formatPrevious.videos,
    };

    return finalStatistics;
  }
}
