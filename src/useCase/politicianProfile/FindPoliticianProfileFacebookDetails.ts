import { FacebookBaseDataRepository } from "@/repositories/FacebookBaseDataRepository";
import { FacebookPostBaseDataRepository } from "@/repositories/FacebookPostBaseDataRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { FacebookDataFormatter } from "@/utils/dataFormatter/facebook";

interface FindPoliticianProfileFacebookDetailsUseCaseRequest {
  id: string;
  period: number;
}

interface FindPoliticianProfileFacebookDetailsUseCaseResponse {}

export class FindPoliticianProfileFacebookDetailsUseCase {
  constructor(
    private facebookBaseDataRepository: FacebookBaseDataRepository,
    private facebookPostBaseDataRepository: FacebookPostBaseDataRepository,
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    id,
    period,
  }: FindPoliticianProfileFacebookDetailsUseCaseRequest): Promise<FindPoliticianProfileFacebookDetailsUseCaseResponse> {
    const { current, previous } =
      await this.politicianProfileRepository.findFacebookStatistics({
        id,
        period,
      });

    const formatCurrent = current ? FacebookDataFormatter(current) : null;
    const formatPrevious = previous ? FacebookDataFormatter(previous) : null;

    const finalStatistics = {
      keyIndicators: {
        current: formatCurrent ? formatCurrent.postEngagementData : null,
        previous: formatPrevious ? formatPrevious.postEngagementData : null,
      },
      commentsStatistics: formatCurrent
        ? formatCurrent.commentStatistics
        : null,
      posts: formatPrevious ? formatPrevious.posts : null,
    };

    return finalStatistics;
  }
}
