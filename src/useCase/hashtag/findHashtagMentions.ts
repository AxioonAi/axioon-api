import { HashtagMonitoringRepository } from "@/repositories/hashtagMonitoringRepository";
import { HashtagRepository } from "@/repositories/hashtagRepository";
import { CommentWordCount } from "@/utils/dataFormatter/commentWordCount";
import { hashtagMentionsFormatter } from "@/utils/dataFormatter/hashtagMentions";
import { HashtagWordCount } from "@/utils/dataFormatter/hashtagWordCount";
interface findHashtagMentionsUseCaseRequest {
  userId: string;
  startDate: Date;
  endDate: Date;
}

interface findHashtagMentionsUseCaseResponse {}

export class FindHashtagMentionsUseCase {
  constructor(private hashtagRepository: HashtagRepository) {}

  async execute({
    userId,
    startDate,
    endDate,
  }: findHashtagMentionsUseCaseRequest): Promise<findHashtagMentionsUseCaseResponse> {
    const hashtags = await this.hashtagRepository.findHashtagMentions({
      userId,
      startDate,
      endDate,
    });

    const formattedHashtags = hashtagMentionsFormatter(hashtags);
    const instagramComments: { text: string; sentimentAnalysis: number }[] =
      formattedHashtags.posts.instagram
        .map((post) => {
          return post.comments.map((comment) => comment);
        })
        .flat();

    const tiktokComments: { text: string; sentimentAnalysis: number }[] =
      formattedHashtags.posts.tiktok
        .map((post) => {
          return post.comments.map((comment) => comment);
        })
        .flat();

    const wordCloud = CommentWordCount({
      facebookPostComments: [],
      youtubeCommentData: [],
      instagramPostComments: instagramComments,
      tiktokComments,
    });

    const hashtagList: {
      text: string;
      sentimentAnalysis: number;
    }[] = [];

    formattedHashtags.posts.instagram.forEach((post) => {
      if (post.hashtags) {
        hashtagList.push({
          text: post.hashtags,
          sentimentAnalysis: post.sentimentAnalysis,
        });
      }
    });

    formattedHashtags.posts.tiktok.forEach((post) => {
      if (post.hashtags) {
        hashtagList.push({
          text: post.hashtags,
          sentimentAnalysis: post.sentiment,
        });
      }
    });

    const hashtagCloud = HashtagWordCount({
      posts: hashtagList,
    });

    return { hashtagMentions: formattedHashtags, wordCloud, hashtagCloud };
  }
}
