import { TiktokDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";
import { TiktokEngager } from "@prisma/client";
import moment from "moment";

export const tiktokDataFormatter = (data: TiktokDataFormatterInterface) => {
  const { tiktokData, tiktokVideoData, tiktokComments } = data;
  console.log("tiktokData", tiktokData);
  const baseData = tiktokData[0];
  if (!baseData) {
    return null;
  }
  const commentStatisticsData = commentFormatter(tiktokComments);
  const oldVideoDateDiff = mostOldVideoDiffCalculator(tiktokVideoData);

  const dataWithEngagement = [];

  const videoEngagementData = {
    like: 0,
    comments: 0,
    views: 0,
    engagement: 0,
  };

  for (const key in tiktokVideoData) {
    videoEngagementData.like += tiktokVideoData[key].diggCount;
    videoEngagementData.comments += tiktokVideoData[key].commentCount;
    videoEngagementData.views += tiktokVideoData[key].playCount;
    const timeDiff =
      Math.abs(Date.now() - new Date(tiktokVideoData[key].date).getTime()) /
      (1000 * 60 * 60 * 24);

    const engagementSum =
      tiktokVideoData[key].diggCount * 0.5 +
      tiktokVideoData[key].commentCount * 1 +
      tiktokVideoData[key].shareCount * 1.5 +
      tiktokVideoData[key].playCount * 0.2;

    const dataDiffRelation = 1 - timeDiff / oldVideoDateDiff;

    const comments = data.tiktokComments.filter(
      (comment) => comment.video_id === tiktokVideoData[key].id
    );

    let sentimentSum = 0;

    const formattedComments = [];

    for (const comment of comments) {
      const { author, sentimentAnalysis, diggCount, ...rest } = comment;
      formattedComments.push({
        ...rest,
        likeCount: diggCount,
        sentimentAnalysis,
        username: author,
      });
      sentimentSum += comment.sentimentAnalysis;
    }

    const engagement =
      (engagementSum * dataDiffRelation) / (baseData.fans * timeDiff);

    videoEngagementData.engagement += engagement;
    dataWithEngagement.push({
      ...tiktokVideoData[key],
      engagement,
      comments: formattedComments,
      sentiment: sentimentSum / comments.length,
    });
  }

  const rankByEngagement = dataWithEngagement.sort((a, b) => {
    return b.engagement - a.engagement;
  });

  const mostRankedVideo = rankByEngagement[0];

  const finalData: TiktokDataFormatterFinalDataInterface[] = [];

  for (const item of rankByEngagement) {
    const { diggCount, shareCount, ...rest } = item;
    finalData.push({
      ...rest,
      like: diggCount,
      shares: shareCount,
      percentage: (item.engagement / mostRankedVideo.engagement) * 100,
    });
  }

  const commentStatisticsFinalData = {
    ...commentStatisticsData,
    commentTime: [
      {
        name: "00:00 - 04:00",
        value: commentStatisticsData.engagementByHour.midnight_to_four_am,
      },
      {
        name: "04:00 - 10:00",
        value: commentStatisticsData.engagementByHour.four_am_to_ten_am,
      },
      {
        name: "10:00 - 14:00",
        value: commentStatisticsData.engagementByHour.ten_am_to_two_pm,
      },
      {
        name: "14:00 - 18:00",
        value: commentStatisticsData.engagementByHour.two_pm_to_six_pm,
      },
      {
        name: "18:00 - 21:00",
        value: commentStatisticsData.engagementByHour.six_pm_to_nine_pm,
      },
      {
        name: "21:00 - 23:59",
        value: commentStatisticsData.engagementByHour.nine_pm_to_midnight,
      },
    ],
  };

  const followersEvolution = data.tiktokData.map((item) => {
    return {
      date: item.date,
      followers: item.fans,
    };
  });

  const uniqueFollowersEvolution = data.tiktokData.filter(
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
      value: tiktokData[0].fans,
      trendingUp: tiktokData[0].fans > tiktokData[tiktokData.length - 1].fans,
      trendingValue: Number(
        (
          ((tiktokData[tiktokData.length - 1].fans - tiktokData[0].fans) /
            tiktokData[0].fans) *
          100
        ).toFixed(0)
      ),
    },
    {
      name: "Sentimento",
      value: commentStatisticsData.currentSentiment,
      trendingUp: commentStatisticsData.sentimentEvolution[0]
        ? commentStatisticsData.sentimentEvolution[0].value >
          commentStatisticsFinalData.sentimentEvolution[
            commentStatisticsFinalData.sentimentEvolution.length - 1
          ].value
        : true,
      trendingValue: Number(
        (commentStatisticsFinalData.sentimentEvolution[0]
          ? ((commentStatisticsFinalData.sentimentEvolution[
              commentStatisticsFinalData.sentimentEvolution.length - 1
            ].value -
              commentStatisticsData.sentimentEvolution[0].value) /
              commentStatisticsData.sentimentEvolution[0].value) *
            100
          : 0
        ).toFixed(0)
      ),
    },
    {
      name: "Engajamento",
      value: videoEngagementData.engagement,
      trendingUp: true,
    },
  ];

  const staticData = {
    name: tiktokData[0].name,
    username: tiktokData[0].nickname,
    followers: tiktokData[0].fans,
    following: tiktokData[0].heart,
    posts: tiktokData[0].videos,
  };

  return {
    commentsStatistics: commentStatisticsFinalData,
    followersEvolution: finalFollowersEvolution,
    videoEngagementData,
    videos: finalData,
    profileEvolution,
    staticData,
  };
};

const commentFormatter = (
  comments: TiktokDataFormatterCommentDataInterface[]
) => {
  const commentStatisticsData = comments.reduce<Accumulator>(
    (accumulator, comment) => {
      const sentiment = comment.sentimentAnalysis;
      const date = new Date(comment.date);
      const time = date.getHours();
      const day = date.toISOString().split("T")[0]; // Obtém a data no formato 'YYYY-MM-DD'

      // Atualiza o total de sentimento
      accumulator.sentimentStatistics.totalSentiment += sentiment;

      // Contagem de comentários por horário
      if (time >= 0 && time < 4) {
        accumulator.commentTime.midnight_to_four_am++;
      } else if (time >= 4 && time < 10) {
        accumulator.commentTime.four_am_to_ten_am++;
      } else if (time >= 10 && time < 14) {
        accumulator.commentTime.ten_am_to_two_pm++;
      } else if (time >= 14 && time < 18) {
        accumulator.commentTime.two_pm_to_six_pm++;
      } else if (time >= 18 && time < 21) {
        accumulator.commentTime.six_pm_to_nine_pm++;
      } else {
        accumulator.commentTime.nine_pm_to_midnight++;
      }

      // Contagem de comentários e soma de sentimentos por dia
      if (!accumulator.dailyStatistics[day]) {
        accumulator.dailyStatistics[day] = {
          commentCount: 0,
          totalSentiment: 0,
          positiveComments: 0,
          negativeComments: 0,
          neutralComments: 0,
        };
      }
      accumulator.dailyStatistics[day].commentCount++;
      accumulator.dailyStatistics[day].totalSentiment += sentiment;

      if (sentiment >= 0 && sentiment <= 350) {
        accumulator.sentimentStatistics.countSentiment0To350++;
        accumulator.dailyStatistics[day].negativeComments++;
      } else if (sentiment > 350 && sentiment <= 650) {
        accumulator.sentimentStatistics.countSentiment351To650++;
        accumulator.dailyStatistics[day].neutralComments++;
      } else if (sentiment > 650 && sentiment <= 1000) {
        accumulator.sentimentStatistics.countSentiment651To1000++;
        accumulator.dailyStatistics[day].positiveComments++;
      }

      // Contagem de comentários por sexo
      if (comment.authorGender === "MALE") {
        accumulator.commentByGender.male++;
      } else if (comment.authorGender === "FEMALE") {
        accumulator.commentByGender.female++;
      } else {
        accumulator.commentByGender.unknown++;
      }

      if (comment.tiktokEngagerId) {
        if (!accumulator.engagers[comment.tiktokEngagerId]) {
          accumulator.engagers[comment.tiktokEngagerId] = {
            comments: 0,
            sentiment: 0,
            positiveComments: 0,
            negativeComments: 0,
            neutralComments: 0,
            userName: comment.engager?.name,
            heart: comment.engager?.heart,
            fans: comment.engager?.fans,
          };
        }

        accumulator.engagers[comment.tiktokEngagerId].comments++;
        accumulator.engagers[comment.tiktokEngagerId].sentiment += sentiment;
        if (sentiment >= 0 && sentiment <= 350) {
          accumulator.engagers[comment.tiktokEngagerId].negativeComments++;
        } else if (sentiment > 350 && sentiment <= 650) {
          accumulator.engagers[comment.tiktokEngagerId].neutralComments++;
        } else if (sentiment > 650 && sentiment <= 1000) {
          accumulator.engagers[comment.tiktokEngagerId].positiveComments++;
        }
      }

      return accumulator;
    },
    {
      sentimentStatistics: {
        totalSentiment: 0,
        countSentiment0To350: 0,
        countSentiment351To650: 0,
        countSentiment651To1000: 0,
      },
      commentTime: {
        midnight_to_four_am: 0,
        four_am_to_ten_am: 0,
        ten_am_to_two_pm: 0,
        two_pm_to_six_pm: 0,
        six_pm_to_nine_pm: 0,
        nine_pm_to_midnight: 0,
      },
      commentByGender: {
        male: 0,
        female: 0,
        unknown: 0,
      },
      dailyStatistics: {},
      engagers: {},
    }
  );

  commentStatisticsData.sentimentStatistics.sentimentAverage = Number(
    (
      commentStatisticsData.sentimentStatistics.totalSentiment / comments.length
    ).toFixed(2)
  );

  const dailyStatisticsArray = Object.entries(
    commentStatisticsData.dailyStatistics
  ).map(([date, stats]: [string, any]) => ({
    label: date,
    value: stats.totalSentiment / stats.commentCount,
  }));

  const dailyQuantityArray = Object.entries(
    commentStatisticsData.dailyStatistics
  ).map(([date, stats]: [string, any]) => ({
    label: date,
    positive: stats.positiveComments,
    negative: stats.negativeComments,
    neutral: stats.neutralComments,
  }));

  const engagersArray = Object.entries(commentStatisticsData.engagers).map(
    ([id, stats]: [string, any]) => ({
      id,
      ...stats,
      sentiment: Number((stats.sentiment / stats.comments).toFixed(2)),
    })
  );

  return {
    sentimentEvolution: dailyStatisticsArray,
    currentSentiment: Number(
      commentStatisticsData.sentimentStatistics.sentimentAverage.toFixed(2)
    ),
    engagementByHour: commentStatisticsData.commentTime,
    commentByDays: dailyQuantityArray,
    commentByGender: commentStatisticsData.commentByGender,
    commentBySentiment: commentStatisticsData.sentimentStatistics,
    engagers: engagersArray,
  };
};

const mostOldVideoDiffCalculator = (
  videos: TiktokDataFormatterVideoDataInterface[]
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

export interface TiktokDataFormatterInterface {
  tiktokData: TiktokDataFormatterBaseDataInterface[];
  tiktokVideoData: TiktokDataFormatterVideoDataInterface[];
  tiktokComments: TiktokDataFormatterCommentDataInterface[];
}

export interface TiktokDataFormatterBaseDataInterface {
  id: string;
  fans: number;
  videos: number;
  verified: boolean;
  avatar: string;
  heart: number;
  date: Date;
  name: string;
  nickname: string;
}
export interface TiktokDataFormatterVideoDataInterface {
  id: string;
  text: string;
  url: string;
  diggCount: number;
  commentCount: number;
  shareCount: number;
  playCount: number;
  date: Date;
}
export interface TiktokDataFormatterCommentDataInterface {
  id: string;
  diggCount: number;
  date: Date;
  replyCount: number;
  author: string;
  video_id: string;
  text: string;
  sentimentAnalysis: number;
  authorGender: string;
  tiktokEngagerId?: string | null;
  engager?: TiktokEngager | null;
}

interface Comment {
  sentimentAnalysis: number;
  date: string;
  authorGender: "MALE" | "FEMALE" | "UNKNOWN";
  tiktokEngagerId?: string;
  engager?: {
    name: string;
    heart: number;
    fans: number;
  };
}

interface SentimentStatistics {
  totalSentiment: number;
  countSentiment0To350: number;
  countSentiment351To650: number;
  countSentiment651To1000: number;
  sentimentAverage?: number;
}

interface CommentTime {
  midnight_to_four_am: number;
  four_am_to_ten_am: number;
  ten_am_to_two_pm: number;
  two_pm_to_six_pm: number;
  six_pm_to_nine_pm: number;
  nine_pm_to_midnight: number;
}

interface CommentByGender {
  male: number;
  female: number;
  unknown: number;
}

interface DailyStatistics {
  [date: string]: {
    commentCount: number;
    totalSentiment: number;
    positiveComments: number;
    negativeComments: number;
    neutralComments: number;
  };
}

interface Engager {
  comments: number;
  sentiment: number;
  positiveComments: number;
  negativeComments: number;
  neutralComments: number;
  userName?: string;
  heart?: number;
  fans?: number;
}

interface Accumulator {
  sentimentStatistics: SentimentStatistics;
  commentTime: CommentTime;
  commentByGender: CommentByGender;
  dailyStatistics: DailyStatistics;
  engagers: { [id: string]: Engager };
}
