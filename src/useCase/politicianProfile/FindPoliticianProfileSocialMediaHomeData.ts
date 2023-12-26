import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { CommentWordCount } from "@/utils/dataFormatter/commentWordCount";
import { EngagementDataFormatter } from "@/utils/dataFormatter/engagement";

interface FindPoliticianProfileSocialMediaHomeDataUseCaseRequest {
  id: string;
  period: number;
}

interface FindPoliticianProfileSocialMediaHomeDataUseCaseResponse {}

export class FindPoliticianProfileSocialMediaHomeDataUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    id,
    period,
  }: FindPoliticianProfileSocialMediaHomeDataUseCaseRequest): Promise<FindPoliticianProfileSocialMediaHomeDataUseCaseResponse> {
    const [followers, comments, posts] = await Promise.all([
      this.politicianProfileRepository.findFollowersStatistics({ id, period }),
      this.politicianProfileRepository.findCommentsStatistics({ id, period }),
      this.politicianProfileRepository.findPostsStatistics({ id, period }),
    ]);

    const wordCount = !comments ? null : CommentWordCount(comments);
    const engagement = !posts ? null : EngagementDataFormatter(posts);

    const data = {
      followers: {
        current: {
          instagram: followers[0].instagramData[0]
            ? followers[0].instagramData[0].followers
            : 0,
          tiktok: followers[0].tiktokData[0]
            ? followers[0].tiktokData[0].fans
            : 0,
          facebook: followers[0].facebookData[0]
            ? followers[0].facebookData[0].followers_count
            : 0,
          youtube: followers[0].youtubeBaseData[0]
            ? followers[0].youtubeBaseData[0].channel_total_subs
            : 0,
        },
        previous: {
          instagram: followers[1].instagramData[0]
            ? followers[1].instagramData[0].followers
            : 0,
          tiktok: followers[1].tiktokData[0]
            ? followers[1].tiktokData[0].fans
            : 0,
          facebook: followers[1].facebookData[0]
            ? followers[1].facebookData[0].followers_count
            : 0,
          youtube: followers[1].youtubeBaseData[0]
            ? followers[1].youtubeBaseData[0].channel_total_subs
            : 0,
        },
        currentTotal: followers[0].instagramData[0]
          ? followers[0].instagramData[0].followers
          : 0 + followers[0].tiktokData[0]
          ? followers[0].tiktokData[0].fans
          : 0 + followers[0].facebookData[0]
          ? followers[0].facebookData[0].followers_count
          : 0 + followers[0].youtubeBaseData[0]
          ? followers[0].youtubeBaseData[0].channel_total_subs
          : 0,
        previousTotal: followers[1].instagramData[0]
          ? followers[1].instagramData[0].followers
          : 0 + followers[1].tiktokData[0]
          ? followers[1].tiktokData[0].fans
          : 0 + followers[1].facebookData[0]
          ? followers[1].facebookData[0].followers_count
          : 0 + followers[1].youtubeBaseData[0]
          ? followers[1].youtubeBaseData[0].channel_total_subs
          : 0,
      },
      wordCloud: wordCount,
      engagement,
    };

    return data;
  }
}
