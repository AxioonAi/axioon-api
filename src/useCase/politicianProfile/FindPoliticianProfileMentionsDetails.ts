import { ProfileNotFoundError } from "@/helper/errors/ProfileNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { CommentWordCount } from "@/utils/dataFormatter/commentWordCount";
import { HashtagWordCount } from "@/utils/dataFormatter/hashtagWordCount";
import { mentionsFormatter } from "@/utils/dataFormatter/mentions";
import moment from "moment";

interface FindPoliticianProfileMentionsDetailsUseCaseRequest {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface FindPoliticianProfileMentionsDetailsUseCaseResponse {}

export class FindPoliticianProfileMentionsDetailsUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    id,
    startDate,
    endDate,
  }: FindPoliticianProfileMentionsDetailsUseCaseRequest): Promise<FindPoliticianProfileMentionsDetailsUseCaseResponse> {
    const data = await this.politicianProfileRepository.findMentionsStatistics({
      id,
      gte: moment(startDate).toDate(),
      lte: moment(endDate).toDate(),
    });

    if (!data) throw new ProfileNotFoundError();

    const currentFormat = mentionsFormatter(data);

    const instagramComments: { text: string; sentimentAnalysis: number }[] =
      data.instagramMentionComments.map((comment) => comment);

    const wordCloud = CommentWordCount({
      facebookPostComments: [],
      youtubeCommentData: [],
      instagramPostComments: instagramComments,
      tiktokComments: [],
    });

    const hashtagList: {
      text: string;
      sentimentAnalysis: number;
    }[] = [];

    currentFormat.posts.instagram.forEach((post) => {
      if (post.hashtags) {
        hashtagList.push({
          text: post.hashtags,
          sentimentAnalysis: post.sentimentAnalysis,
        });
      }
    });

    const hashtagCloud = HashtagWordCount({
      posts: hashtagList,
    });

    return { mentions: currentFormat, wordCloud, hashtagCloud };
  }
}
