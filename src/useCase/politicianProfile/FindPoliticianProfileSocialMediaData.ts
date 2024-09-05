import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { CommentWordCount } from "@/utils/dataFormatter/commentWordCount";
import { FacebookDataFormatter } from "@/utils/dataFormatter/facebook";
import { instagramDataFormatter } from "@/utils/dataFormatter/instagram";
import { tiktokDataFormatter } from "@/utils/dataFormatter/tiktok";
import { youtubeDataFormatter } from "@/utils/dataFormatter/youtube";
import moment from "moment";

interface FindPoliticianProfileSocialMediaDataUseCaseRequest {
  profileId: string;
  startDate: Date;
  endDate: Date;
  medias: {
    instagram: boolean;
    facebook: boolean;
    youtube: boolean;
    tiktok: boolean;
  };
}

interface FindPoliticianProfileSocialMediaDataUseCaseResponse {}

export class FindPoliticianProfileSocialMediaDataUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository
  ) {}

  async execute({
    profileId,
    startDate,
    endDate,
    medias,
  }: FindPoliticianProfileSocialMediaDataUseCaseRequest): Promise<FindPoliticianProfileSocialMediaDataUseCaseResponse> {
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    const [youtubeData, tiktokData, instagramData, facebookData] =
      await Promise.all([
        medias.youtube
          ? this.politicianProfileRepository.findYoutubeStatistics({
              id: profileId,
              gte: moment(startDate).startOf("day").toDate(),
              lte: moment(endDate).endOf("day").add(1, "d").toDate(),
            })
          : null,
        medias.tiktok
          ? this.politicianProfileRepository.findTiktokStatistics({
              id: profileId,
              gte: moment(startDate).startOf("day").toDate(),
              lte: moment(endDate).endOf("day").add(1, "d").toDate(),
            })
          : null,
        medias.instagram
          ? this.politicianProfileRepository.findInstagramStatistics({
              id: profileId,
              gte: moment(startDate).startOf("day").toDate(),
              lte: moment(endDate).endOf("day").add(1, "d").toDate(),
            })
          : null,
        medias.facebook
          ? this.politicianProfileRepository.findFacebookStatistics({
              id: profileId,
              gte: moment(startDate).startOf("day").toDate(),
              lte: moment(endDate).endOf("day").add(1, "d").toDate(),
            })
          : null,
      ]);

    const formatYoutubeData = youtubeData && youtubeDataFormatter(youtubeData);
    const formatTiktokData = tiktokData && tiktokDataFormatter(tiktokData);

    const formatInstagramData =
      instagramData && instagramDataFormatter(instagramData);
    const formatFacebookData =
      facebookData && FacebookDataFormatter(facebookData);

    const wordCloud = CommentWordCount({
      tiktokComments: (tiktokData && tiktokData.tiktokComments) || [],
      instagramPostComments:
        (instagramData && instagramData.instagramPostComments) || [],
      youtubeCommentData: (youtubeData && youtubeData.youtubeCommentData) || [],
      facebookPostComments:
        (facebookData && facebookData.facebookPostComments) || [],
    });

    const finalData = {
      commentsData: {
        sentimentEvolution: {
          instagram:
            (formatInstagramData &&
              formatInstagramData.commentsStatistics?.sentimentEvolution) ||
            null,
          tiktok:
            (formatTiktokData &&
              formatTiktokData.commentsStatistics?.sentimentEvolution) ||
            null,
          youtube: null,
          facebook:
            (formatFacebookData &&
              formatFacebookData.commentsStatistics?.sentimentEvolution) ||
            null,
        },
        currentSentiment: {
          instagram:
            (formatInstagramData &&
              formatInstagramData.commentsStatistics.currentSentiment) ||
            null,
          tiktok:
            (formatTiktokData &&
              formatTiktokData.commentsStatistics.currentSentiment) ||
            null,
          youtube:
            (formatYoutubeData &&
              formatYoutubeData?.commentsStatistics?.currentSentiment) ||
            null,
          facebook:
            (formatFacebookData &&
              formatFacebookData.commentsStatistics?.currentSentiment) ||
            null,
        },
        engagementByHour: {
          instagram:
            (formatInstagramData &&
              formatInstagramData.commentsStatistics.engagementByHour) ||
            null,
          tiktok:
            (formatTiktokData &&
              formatTiktokData.commentsStatistics.engagementByHour) ||
            null,
          facebook:
            (formatFacebookData &&
              formatFacebookData.commentsStatistics?.engagementByHour) ||
            null,
        },
        commentByDays: {
          instagram:
            (formatInstagramData &&
              formatInstagramData.commentsStatistics.commentByDays) ||
            null,
          tiktok:
            (formatTiktokData &&
              formatTiktokData.commentsStatistics.commentByDays) ||
            null,
          facebook:
            (formatFacebookData &&
              formatFacebookData.commentsStatistics.commentByDays) ||
            null,
        },
        commentByGender: {
          instagram:
            (formatInstagramData &&
              formatInstagramData.commentsStatistics.commentByGender) ||
            null,
          tiktok:
            (formatTiktokData &&
              formatTiktokData.commentsStatistics.commentByGender) ||
            null,
          youtube:
            (formatYoutubeData &&
              formatYoutubeData.commentsStatistics.commentByGender) ||
            null,
          facebook:
            (formatFacebookData &&
              formatFacebookData.commentsStatistics.commentByGender) ||
            null,
        },
        commentBySentiment: {
          instagram:
            (formatInstagramData &&
              formatInstagramData.commentsStatistics.commentBySentiment) ||
            null,
          tiktok:
            formatTiktokData &&
            formatTiktokData.commentsStatistics.commentBySentiment,
          youtube:
            (formatYoutubeData &&
              formatYoutubeData.commentsStatistics.commentBySentiment) ||
            null,
          facebook:
            (formatFacebookData &&
              formatFacebookData.commentsStatistics.commentBySentiment) ||
            null,
        },
        engagers: {
          instagram:
            (formatInstagramData &&
              formatInstagramData.commentsStatistics.engagers) ||
            null,
          tiktok:
            formatTiktokData && formatTiktokData.commentsStatistics.engagers,
          facebook:
            (formatFacebookData &&
              formatFacebookData.commentsStatistics.engagers) ||
            null,
        },
        commentTime: {
          instagram:
            (formatInstagramData &&
              formatInstagramData.commentsStatistics.commentTime) ||
            null,
          tiktok:
            formatTiktokData && formatTiktokData.commentsStatistics.commentTime,
          facebook:
            (formatFacebookData &&
              formatFacebookData.commentsStatistics.commentTime) ||
            null,
        },
        wordCloud,
      },
      followersEvolution: {
        instagram:
          (formatInstagramData && formatInstagramData.followersEvolution) ||
          null,
        tiktok: formatTiktokData && formatTiktokData.followersEvolution,
        youtube:
          (formatYoutubeData && formatYoutubeData.followersEvolution) || null,
        facebook:
          (formatFacebookData && formatFacebookData.followersEvolution) || null,
      },
      posts: {
        instagram: (formatInstagramData && formatInstagramData.posts) || null,
        tiktok: formatTiktokData && formatTiktokData.videos,
        youtube: (formatYoutubeData && formatYoutubeData.videos) || null,
        facebook: (formatFacebookData && formatFacebookData.posts) || null,
      },
      staticData: {
        instagramData: formatInstagramData && formatInstagramData.staticData,
        tiktokData: (formatTiktokData && formatTiktokData.staticData) || null,
        youtubeData:
          (formatYoutubeData && formatYoutubeData.staticData) || null,
        facebookData:
          (formatFacebookData && formatFacebookData.staticData) || null,
      },
      profileEvolution: {
        tiktok: formatTiktokData && formatTiktokData.profileEvolution,
        youtube: formatYoutubeData && formatYoutubeData.profileEvolution,
        facebook: formatFacebookData && formatFacebookData.profileEvolution,
        instagram: formatInstagramData && formatInstagramData.profileEvolution,
      },
    };

    return {
      data: finalData,
    };
  }
}
