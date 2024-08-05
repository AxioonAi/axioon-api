import {
  Hashtag,
  InstagramHashtagMention,
  InstagramHashtagMentionComment,
  TiktokHashtagCommentData,
  TiktokHashtagMention,
} from "@prisma/client";
import { TiktokDataFormatterCommentDataInterface } from "./tiktok";

interface HashtagMentions extends Hashtag {
  instagramMentions: InstagramHashtagMention[];
  instagramMentionsComments: InstagramHashtagMentionComment[];
  tiktokMentions: TiktokHashtagMention[];
  tiktokMentionsComments: TiktokHashtagCommentData[];
}

export const hashtagMentionsFormatter = (data: HashtagMentions[]) => {
  const hashtagMentions = [];
  for (const hashtag of data) {
    let tiktokSentiment = 0;
    let instagramSentiment = 0;
    const {
      tiktokMentions,
      tiktokMentionsComments,
      instagramMentions,
      instagramMentionsComments,
    } = hashtag;

    const tiktokCommentFormatted = tiktokCommentFormatter(
      tiktokMentionsComments
    );
    const instagramMentionsCommentsFormatted = instagramCommentFormatter(
      instagramMentionsComments
    );

    const tiktokDataWithEngagement = [];

    for (const key in tiktokMentions) {
      const timeDiff =
        Math.abs(Date.now() - new Date(tiktokMentions[key].date).getTime()) /
        (1000 * 60 * 60 * 24);

      const engagementSum =
        tiktokMentions[key].diggCount * 0.5 +
        tiktokMentions[key].commentCount * 1 +
        tiktokMentions[key].shareCount * 1.5 +
        tiktokMentions[key].playCount * 0.2;

      const comments = tiktokMentionsComments.filter(
        (comment) => comment.video_id === tiktokMentions[key].id
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

      tiktokDataWithEngagement.push({
        ...tiktokMentions[key],
        comments: formattedComments,
        sentiment: sentimentSum / comments.length,
      });

      tiktokSentiment += sentimentSum / comments.length;
    }

    const instagramDataWithEngagement = [];

    for (const key in instagramMentions) {
      const timeDiff =
        Math.abs(
          Date.now() - new Date(instagramMentions[key].pubDate).getTime()
        ) /
        (1000 * 60 * 60 * 24);

      const comments = instagramMentionsComments.filter(
        (comment) => comment.post_id === instagramMentions[key].id
      );

      let sentimentSum = 0;

      const formattedComments = [];

      for (const comment of comments) {
        const { ownerUsername, sentimentAnalysis, likeCount, ...rest } =
          comment;
        formattedComments.push({
          ...rest,
          likeCount,
          sentimentAnalysis,
          username: ownerUsername,
        });
        sentimentSum += comment.sentimentAnalysis;
      }

      instagramDataWithEngagement.push({
        ...instagramMentions[key],
        comments: formattedComments,
        sentiment: sentimentSum / comments.length,
      });

      instagramSentiment += sentimentSum / comments.length;
    }

    const tiktokMentionsByDay = tiktokDataWithEngagement.reduce(
      (acc, curr) => {
        const date = new Date(curr.date).toLocaleDateString();
        const sentiment = curr.sentiment;
        if (!acc[date]) {
          acc[date] = {
            positive: 0,
            negative: 0,
            neutral: 0,
            total: 0,
          };
        }

        if (sentiment >= 0 && sentiment <= 350) {
          acc[date].negative++;
        } else if (sentiment > 350 && sentiment <= 650) {
          acc[date].neutral++;
        } else if (sentiment > 650 && sentiment <= 1000) {
          acc[date].positive++;
        }

        acc[date].total++;

        return acc;
      },
      {} as {
        [key: string]: {
          positive: number;
          negative: number;
          neutral: number;
          total: number;
        };
      }
    );

    const instagramMentionsByDay = instagramDataWithEngagement.reduce(
      (acc, curr) => {
        const date = new Date(curr.pubDate).toLocaleDateString();
        const sentiment = curr.sentiment;
        if (!acc[date]) {
          acc[date] = {
            positive: 0,
            negative: 0,
            neutral: 0,
            total: 0,
          };
        }

        if (sentiment >= 0 && sentiment <= 350) {
          acc[date].negative++;
        } else if (sentiment > 350 && sentiment <= 650) {
          acc[date].neutral++;
        } else if (sentiment > 650 && sentiment <= 1000) {
          acc[date].positive++;
        }

        acc[date].total++;

        return acc;
      },
      {} as {
        [key: string]: {
          positive: number;
          negative: number;
          neutral: number;
          total: number;
        };
      }
    );

    hashtagMentions.push({
      hashtag: hashtag.hashtag,
      id: hashtag.id,
      data: {
        commentData: {
          sentimentEvolution: {
            tiktok: tiktokCommentFormatted.sentimentEvolution,
            instagram: instagramMentionsCommentsFormatted.sentimentEvolution,
          },
          currentSentiment: {
            tiktok: tiktokCommentFormatted.currentSentiment,
            instagram: instagramMentionsCommentsFormatted.currentSentiment,
          },
          engagementByHour: {
            tiktok: tiktokCommentFormatted.engagementByHour,
            instagram: instagramMentionsCommentsFormatted.engagementByHour,
          },
          commentByDays: {
            tiktok: tiktokCommentFormatted.commentByDays,
            instagram: instagramMentionsCommentsFormatted.commentByDays,
          },
          commentByGender: {
            tiktok: tiktokCommentFormatted.commentByGender,
            instagram: instagramMentionsCommentsFormatted.commentByGender,
          },
          commentBySentiment: {
            tiktok: tiktokCommentFormatted.commentBySentiment,
            instagram: instagramMentionsCommentsFormatted.commentBySentiment,
          },
          engagers: {
            tiktok: tiktokCommentFormatted.engagers,
            instagram: instagramMentionsCommentsFormatted.engagers,
          },
        },
        mentionQuantity: {
          tiktok: tiktokMentions.length,
          instagram: instagramMentions.length,
        },
        mentionsByDay: {
          tiktok: tiktokMentionsByDay,
          instagram: instagramMentionsByDay,
        },
        posts: {
          tiktok: tiktokDataWithEngagement,
          instagram: instagramDataWithEngagement,
        },
        mentionsByFount: [
          {
            name: "Instagram",
            quantity: instagramMentions.length,
            sentiment: instagramSentiment / instagramMentions.length,
          },
          {
            name: "Tiktok",
            quantity: tiktokMentions.length,
            sentiment: tiktokSentiment / tiktokMentions.length,
          },
        ],
      },
    });
  }

  return hashtagMentions;
};

const instagramCommentFormatter = (
  comments: {
    id: string;
    text: string;
    post_id: string;
    ownerUsername: string;
    ownerProfilePicUrl: string;
    timestamp: Date;
    likeCount: number;
    authorGender: string;
    sentimentAnalysis: number;
    engager?: InstagramEngager | null;
    instagramEngagerId?: string | null;
  }[]
) => {
  const commentStatisticsData = comments.reduce<InstagramAccumulator>(
    (accumulator, comment) => {
      const sentiment = comment.sentimentAnalysis;
      const date = new Date(comment.timestamp);
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

      if (comment.instagramEngagerId) {
        if (!accumulator.engagers[comment.instagramEngagerId]) {
          accumulator.engagers[comment.instagramEngagerId] = {
            comments: 0,
            sentiment: 0,
            positiveComments: 0,
            negativeComments: 0,
            neutralComments: 0,
            userName: comment.engager?.userName,
            followers: comment.engager?.followers,
          };
        }

        accumulator.engagers[comment.instagramEngagerId].comments++;
        accumulator.engagers[comment.instagramEngagerId].sentiment += sentiment;
        if (sentiment >= 0 && sentiment <= 350) {
          accumulator.engagers[comment.instagramEngagerId].negativeComments++;
        } else if (sentiment > 350 && sentiment <= 650) {
          accumulator.engagers[comment.instagramEngagerId].neutralComments++;
        } else if (sentiment > 650 && sentiment <= 1000) {
          accumulator.engagers[comment.instagramEngagerId].positiveComments++;
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

const tiktokCommentFormatter = (
  comments: TiktokDataFormatterCommentDataInterface[]
) => {
  const commentStatisticsData = comments.reduce<TiktokAccumulator>(
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

interface InstagramEngager {
  comments: number;
  sentiment: number;
  positiveComments: number;
  negativeComments: number;
  neutralComments: number;
  userName?: string;
  followers?: number;
}

interface InstagramAccumulator {
  sentimentStatistics: SentimentStatistics;
  commentTime: CommentTime;
  commentByGender: CommentByGender;
  dailyStatistics: DailyStatistics;
  engagers: { [id: string]: InstagramEngager };
}

interface TiktokEngager {
  comments: number;
  sentiment: number;
  positiveComments: number;
  negativeComments: number;
  neutralComments: number;
  userName?: string;
  heart?: number;
  fans?: number;
}

interface TiktokAccumulator {
  sentimentStatistics: SentimentStatistics;
  commentTime: CommentTime;
  commentByGender: CommentByGender;
  dailyStatistics: DailyStatistics;
  engagers: { [id: string]: TiktokEngager };
}
