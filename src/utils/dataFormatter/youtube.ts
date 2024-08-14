import {
  YoutubeDataFormatterBaseDataInterface,
  YoutubeDataFormatterCommentDataInterface,
  YoutubeDataFormatterInterface,
  YoutubeDataFormatterVideoDataInterface,
} from "@/@types/formatData";
import { YoutubeDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";
import moment from "moment";

export const youtubeDataFormatter = (data: YoutubeDataFormatterInterface) => {
  const { youtubeBaseData, youtubeVideoData, youtubeCommentData } = data;

  const baseData = youtubeBaseData[0];

  if (!baseData) return;

  const commentStatisticsData = commentFormatter(youtubeCommentData);
  const oldVideoDateDiff = mostOldVideoDiffCalculator(youtubeVideoData);

  const dataWithEngagement = [];

  const videoEngagementData = {
    like: 0,
    comments: 0,
    views: 0,
  };

  for (const key in youtubeVideoData) {
    videoEngagementData.like += youtubeVideoData[key].likes;
    videoEngagementData.comments += youtubeVideoData[key].commentsCount;
    videoEngagementData.views += youtubeVideoData[key].viewCount;
    const timeDiff =
      Math.abs(Date.now() - new Date(youtubeVideoData[key].date).getTime()) /
      (1000 * 60 * 60 * 24);

    const engagementSum =
      youtubeVideoData[key].commentsCount * 1.5 +
      youtubeVideoData[key].likes * 1 +
      youtubeVideoData[key].viewCount * 0.5;

    const dateDiffRelation = 1 - timeDiff / oldVideoDateDiff;

    const comments = youtubeCommentData.filter(
      (comment) => comment.video_id === youtubeVideoData[key].id
    );

    let sentimentSum = 0;

    const formattedComments = [];

    for (const comment of comments) {
      const { author, ...rest } = comment;
      sentimentSum += comment.sentimentAnalysis;

      formattedComments.push({
        username: author,
        ...rest,
      });
    }

    const engagement =
      (engagementSum * dateDiffRelation) /
      100 /
      (baseData.channel_total_subs / 1000);

    dataWithEngagement.push({
      ...youtubeVideoData[key],
      engagement,
      text: youtubeVideoData[key].title,
      comments: formattedComments,
      sentiment: sentimentSum / comments.length,
    });
  }

  const rankByEngagement = dataWithEngagement.sort((a, b) => {
    return b.engagement - a.engagement;
  });

  const mostRankedVideo = rankByEngagement[0];

  const finalData: YoutubeDataFormatterFinalDataInterface[] = [];
  for (const video of dataWithEngagement) {
    const { likes, commentsCount, viewCount, ...rest } = video;
    finalData.push({
      ...rest,
      like: likes,
      commentCount: commentsCount,
      views: viewCount,
      percentage: (video.engagement / mostRankedVideo.engagement) * 100,
    });
  }

  const followersEvolution = data.youtubeBaseData.map((item) => {
    return {
      date: item.date,
      followers: item.channel_total_subs,
    };
  });

  const uniqueFollowersEvolution = data.youtubeBaseData.filter(
    (item, index, self) => {
      return (
        self.findIndex((i) =>
          moment(i.date).isSame(moment(item.date), "day")
        ) === index
      );
    }
  );

  // Passo 2: Limitar a 10 objetos
  let finalFollowersEvolution = uniqueFollowersEvolution;

  if (uniqueFollowersEvolution.length > 10) {
    const firstItem = uniqueFollowersEvolution[0];
    const lastItem =
      uniqueFollowersEvolution[uniqueFollowersEvolution.length - 1];

    const step = Math.floor((uniqueFollowersEvolution.length - 2) / 8);
    finalFollowersEvolution = [firstItem];

    for (let i = 1; i < uniqueFollowersEvolution.length - 1; i += step) {
      if (finalFollowersEvolution.length < 9) {
        finalFollowersEvolution.push(uniqueFollowersEvolution[i]);
      }
    }

    finalFollowersEvolution.push(lastItem);
  }

  const profileEvolution = [
    {
      name: "Seguidores",
      value: youtubeBaseData[0].channel_total_subs,
      trendingUp:
        youtubeBaseData[0].channel_total_subs >
        youtubeBaseData[youtubeBaseData.length - 1].channel_total_subs,
      trendingValue: Number(
        (
          ((youtubeBaseData[youtubeBaseData.length - 1].channel_total_subs -
            youtubeBaseData[0].channel_total_subs) /
            youtubeBaseData[0].channel_total_subs) *
          100
        ).toFixed(0)
      ),
      evolution: finalFollowersEvolution.map((item) => item.channel_total_subs),
    },
    {
      name: "Sentimento",
      value: commentStatisticsData.currentSentiment,
      trendingUp: true,
      trendingValue: 0,
      evolution: [],
    },
    {
      name: "Publicações",
      value: youtubeBaseData[0].channel_total_videos,
      trendingUp:
        youtubeBaseData[0].channel_total_videos >
        youtubeBaseData[youtubeBaseData.length - 1].channel_total_videos,
      trendingValue: Number(
        (
          ((youtubeBaseData[youtubeBaseData.length - 1].channel_total_videos -
            youtubeBaseData[0].channel_total_videos) /
            youtubeBaseData[0].channel_total_videos) *
          100
        ).toFixed(0)
      ),
      evolution: finalFollowersEvolution.map(
        (item) => item.channel_total_videos
      ),
    },
  ];

  const staticData = {
    name: youtubeBaseData[0].channel_name,
    followers: youtubeBaseData[0].channel_total_subs,
    following: youtubeBaseData[0].channel_total_views,
    posts: youtubeBaseData[0].channel_total_videos,
  };

  return {
    commentsStatistics: commentStatisticsData,
    followersEvolution,
    videos: finalData,
    profileEvolution,
    staticData,
  };
};

const commentFormatter = (
  comments: YoutubeDataFormatterCommentDataInterface[]
) => {
  const commentStatisticsData = comments.reduce(
    (accumulator, comment) => {
      const sentiment = comment.sentimentAnalysis;

      // Calcula a média
      accumulator.sentimentStatistics.totalSentiment += sentiment;

      if (comment.authorGender === "MALE") {
        accumulator.commentByGender.male++;
      } else if (comment.authorGender === "FEMALE") {
        accumulator.commentByGender.female++;
      } else {
        accumulator.commentByGender.unknown++;
      }

      // Conta a quantidade de comentários em diferentes faixas de sentimentAnalysis
      if (sentiment >= 0 && sentiment <= 350) {
        accumulator.sentimentStatistics.countSentiment0To350++;
      } else if (sentiment > 350 && sentiment <= 650) {
        accumulator.sentimentStatistics.countSentiment351To650++;
      } else if (sentiment > 650 && sentiment <= 1000) {
        accumulator.sentimentStatistics.countSentiment651To1000++;
      }

      return accumulator;
    },
    {
      sentimentStatistics: {
        totalSentiment: 0,
        countSentiment0To350: 0,
        countSentiment351To650: 0,
        countSentiment651To1000: 0,
        sentimentAverage: 0,
      },
      commentByGender: {
        male: 0,
        female: 0,
        unknown: 0,
      },
    }
  );

  return {
    currentSentiment: Number(
      commentStatisticsData.sentimentStatistics.sentimentAverage.toFixed(2)
    ),
    commentByGender: commentStatisticsData.commentByGender,
    commentBySentiment: commentStatisticsData.sentimentStatistics,
  };
};

const mostOldVideoDiffCalculator = (
  videos: YoutubeDataFormatterVideoDataInterface[]
) => {
  const mostOldVideo = videos.sort((a, b) => {
    return a.date < b.date ? -1 : 1;
  })[0];
  return mostOldVideo
    ? Math.ceil(
        Math.abs(Date.now() - new Date(mostOldVideo.date).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
};
