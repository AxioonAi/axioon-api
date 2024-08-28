import { FacebookDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";
import { FacebookEngager } from "@prisma/client";
import moment from "moment";

export const FacebookDataFormatter = (data: {
  facebookData: {
    id: string;
    date: Date;
    title: string;
    likes_count: number;
    followers_count: number;
  }[];
  facebookPosts: {
    id: string;
    url: string;
    text: string;
    date: Date;
    like: number;
    comments: number;
    shares: number;
    thumbnail: string;
  }[];
  facebookPostComments: {
    id: string;
    postUrl: string;
    text: string;
    likeCount: number;
    date: Date;
    username: string;
    post_id: string;
    politician_id: string;
    sentimentAnalysis: number;
    engager?: FacebookEngager;
    facebookEngagerId?: string | null;
    authorGender: string;
  }[];
}) => {
  const { facebookData, facebookPosts, facebookPostComments } = data;

  const currentFacebookData = facebookData[0];

  if (!currentFacebookData) {
    return null;
  }

  const commentStatisticsData = commentFormatter(facebookPostComments);
  const oldPostDateDiff = mostOldPostDiffCalculator(facebookPosts);
  const dataWithEngagement = [];

  const postEngagementData = {
    like: 0,
    comments: 0,
    shares: 0,
  };

  for (const key in facebookPosts) {
    postEngagementData.like += facebookPosts[key].like;
    postEngagementData.comments += facebookPosts[key].comments;
    postEngagementData.shares += facebookPosts[key].shares;

    const timeDiff =
      Math.abs(Date.now() - new Date(facebookPosts[key].date).getTime()) /
      (1000 * 60 * 60 * 24);

    const engagementSum =
      facebookPosts[key].comments * 1 +
      facebookPosts[key].like * 0.5 +
      facebookPosts[key].shares * 1.5;

    const dateDiffRelation = 1 - timeDiff / oldPostDateDiff;

    const comments = data.facebookPostComments.filter(
      (comment) => comment.post_id === data.facebookPosts[key].id
    );

    let sentimentSum = 0;

    for (const comment of comments) {
      sentimentSum += comment.sentimentAnalysis;
    }

    const engagement =
      (engagementSum * dateDiffRelation) /
      100 /
      (currentFacebookData.followers_count / 1000);

    dataWithEngagement.push({
      ...facebookPosts[key],
      engagement,
      commentCount: facebookPosts[key].comments,
      comments,
      sentiment: sentimentSum / comments.length,
    });
  }

  const rankByEngagement = dataWithEngagement.sort((a, b) => {
    return b.engagement - a.engagement;
  });

  const mostRankedPost = rankByEngagement[0];

  const finalData: FacebookDataFormatterFinalDataInterface[] = [];
  for (const item of rankByEngagement) {
    finalData.push({
      ...item,
      percentage: (item.engagement / mostRankedPost.engagement) * 100,
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

  const followersEvolution = data.facebookData.map((item) => {
    return {
      date: item.date,
      followers: item.followers_count,
    };
  });

  const uniqueFollowersEvolution = data.facebookData.filter(
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

  const staticData = {
    name: facebookData[0].title,
    followers: facebookData[0].followers_count,
    following: facebookData[0].likes_count,
    posts: 0,
  };

  console.log(commentStatisticsFinalData);

  const profileEvolution = [
    {
      name: "Seguidores",
      value: facebookData[0].followers_count,
      trendingUp:
        facebookData[0].followers_count >
        facebookData[facebookData.length - 1].followers_count,
      trendingValue: Number(
        (
          ((facebookData[facebookData.length - 1].followers_count -
            facebookData[0].followers_count) /
            facebookData[0].followers_count) *
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
        : false,
      trendingValue: commentStatisticsData.sentimentEvolution[0]
        ? Number(
            (
              ((commentStatisticsFinalData.sentimentEvolution[
                commentStatisticsFinalData.sentimentEvolution.length - 1
              ].value -
                commentStatisticsData.sentimentEvolution[0].value) /
                commentStatisticsData.sentimentEvolution[0].value) *
              100
            ).toFixed(0)
          )
        : 0,
    },
    {
      name: "Publicações",
      value: 0,
      trendingUp: true,
      trendingValue: 0,
    },
  ];
  console.log("aqui 2");

  return {
    commentsStatistics: commentStatisticsFinalData,
    followersEvolution: finalFollowersEvolution,
    posts: finalData,
    profileEvolution,
    staticData,
  };
};

const commentFormatter = (
  comments: {
    id: string;
    postUrl: string;
    text: string;
    likeCount: number;
    date: Date;
    username: string;
    post_id: string;
    politician_id: string;
    sentimentAnalysis: number;
    engager?: FacebookEngager;
    facebookEngagerId?: string | null;
    authorGender: string;
  }[]
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

      if (comment.facebookEngagerId) {
        if (!accumulator.engagers[comment.facebookEngagerId]) {
          accumulator.engagers[comment.facebookEngagerId] = {
            comments: 0,
            sentiment: 0,
            positiveComments: 0,
            negativeComments: 0,
            neutralComments: 0,
            userName: comment.engager?.name,
            followers: comment.engager?.followers,
          };
        }

        accumulator.engagers[comment.facebookEngagerId].comments++;
        accumulator.engagers[comment.facebookEngagerId].sentiment += sentiment;
        if (sentiment >= 0 && sentiment <= 350) {
          accumulator.engagers[comment.facebookEngagerId].negativeComments++;
        } else if (sentiment > 350 && sentiment <= 650) {
          accumulator.engagers[comment.facebookEngagerId].neutralComments++;
        } else if (sentiment > 650 && sentiment <= 1000) {
          accumulator.engagers[comment.facebookEngagerId].positiveComments++;
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
    value: Number((stats.totalSentiment / stats.commentCount).toFixed(2)),
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

const mostOldPostDiffCalculator = (
  posts: {
    date: Date;
  }[]
) => {
  const mostOldVideo = posts.sort((a, b) => {
    return a.date < b.date ? -1 : 1;
  })[0];
  return mostOldVideo
    ? Math.ceil(
        Math.abs(Date.now() - new Date(mostOldVideo.date).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
};

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
  followers?: number;
}

interface Accumulator {
  sentimentStatistics: SentimentStatistics;
  commentTime: CommentTime;
  commentByGender: CommentByGender;
  dailyStatistics: DailyStatistics;
  engagers: { [id: string]: Engager };
}
