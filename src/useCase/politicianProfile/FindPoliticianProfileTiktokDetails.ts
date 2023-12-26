import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { tiktokDataFormatter } from "@/utils/dataFormatter/tiktok";

interface FindPoliticianProfileTiktokDetailsUseCaseRequest {
  id: string;
  period: number;
}

interface FindPoliticianProfileTiktokDetailsUseCaseResponse {}

export class FindPoliticianProfileTiktokDetailsUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    id,
    period,
  }: FindPoliticianProfileTiktokDetailsUseCaseRequest): Promise<FindPoliticianProfileTiktokDetailsUseCaseResponse> {
    const { previous, current } =
      await this.politicianProfileRepository.findTiktokStatistics({
        id,
        period,
      });

    const formatCurrent = !current ? null : tiktokDataFormatter(current);
    const formatPrevious = !previous ? null : tiktokDataFormatter(previous);

    const finalStatistics = {
      keyIndicators: {
        current: !formatCurrent ? null : formatCurrent.videoEngagementData,
        previous: !formatPrevious ? null : formatPrevious.videoEngagementData,
      },
      commentsStatistics: !formatCurrent
        ? null
        : formatCurrent.commentsStatistics,
      videos: !formatPrevious ? null : formatPrevious.videos,
    };

    return finalStatistics;
  }
}
