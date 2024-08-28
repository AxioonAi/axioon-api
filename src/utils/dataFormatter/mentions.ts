import { MentionsData } from "@/@types/politicianProfileRepository";
import { InstagramEngager, InstagramMention } from "@prisma/client";

export const mentionsFormatter = (data: MentionsData) => {
  let totalSentimentNews = 0;

  const formattedComments = commentFormatter(data.instagramMentionComments);

  const news: newsData = {
    positive: 0,
    neutral: 0,
    negative: 0,
    total: data.news.length,
    average: 0,
    news: [],
  };

  if (data.news.length > 0) {
    for (const item of data.news) {
      totalSentimentNews += item.sentimentAnalysis;
      const sentiment = classifySentiment(item.sentimentAnalysis);

      if (sentiment === "positivo") news.positive++;
      if (sentiment === "neutro") news.neutral++;
      if (sentiment === "negativo") news.negative++;

      news.news.push({
        sentiment: item.sentimentAnalysis,
        sentimentClassification: sentiment,
        title: item.news.title,
        url: item.news.url,
        date: item.news.last_update,
        websiteName: item.news.website ? item.news.website.name : "",
      });
    }
    news.average = totalSentimentNews / data.news.length;
  }

  const instagramData: {
    posts: any[];
    authorData: any[];
    sentiment: number;
  } = {
    posts: [],
    sentiment: 0,
    authorData: [],
  };

  for (const key in data.instagramMention) {
    const timeDiff =
      Math.abs(
        Date.now() - new Date(data.instagramMention[key].pubDate).getTime()
      ) /
      (1000 * 60 * 60 * 24);

    const comments = data.instagramMentionComments.filter(
      (comment) => comment.post_id === data.instagramMention[key].id
    );

    const formattedComments = comments.map((comment) => {
      const { ownerUsername, ...rest } = comment;
      return {
        ...rest,
        username: ownerUsername,
      };
    });

    let sentimentSum = 0;

    for (const comment of comments) {
      sentimentSum += comment.sentimentAnalysis;
    }

    instagramData.posts.push({
      ...data.instagramMention[key],
      url: data.instagramMention[key].postUrl,
      text: data.instagramMention[key].description,
      comments: formattedComments,
      sentiment: sentimentSum / comments.length,
    });

    const engagerExists = instagramData.authorData.find(
      (engager) => engager.id === data.instagramMention[key].engager?.id
    );

    const engagementSum =
      data.instagramMention[key].commentCount * 1 +
      data.instagramMention[key].likeCount * 0.5;

    if (engagerExists) {
      instagramData.authorData[
        instagramData.authorData.indexOf(engagerExists)
      ] = {
        sentiment: engagerExists.sentiment + sentimentSum / comments.length,
        ...engagerExists,
        posts: engagerExists.posts + 1,
        lastPost:
          data.instagramMention[key].pubDate > engagerExists.lastPost
            ? data.instagramMention[key].pubDate
            : engagerExists.lastPost,
        engagement: engagerExists.engagement + engagementSum,
      };
    } else {
      instagramData.authorData.push({
        ...data.instagramMention[key].engager,
        posts: 1,
        lastPost: data.instagramMention[key].pubDate,
        sentiment: sentimentSum / comments.length,
        engagement: engagementSum,
      });
    }

    instagramData.sentiment += sentimentSum / comments.length;
  }

  const newsByWebsites = data.news.reduce((accumulator, item) => {
    const websiteName = item.news.website?.name || "portal";

    if (!accumulator[websiteName]) {
      accumulator[websiteName] = {
        quantity: 0,
        sentiment: item.sentimentAnalysis,
        logo: item.news.website?.website_logo || null,
      };
    }
    accumulator[websiteName].quantity++;
    accumulator[websiteName].sentiment += item.sentimentAnalysis;

    return accumulator;
  }, {} as { [key: string]: { quantity: number; logo: string | null; sentiment: number } });

  const newsByWebsitesArray = Object.entries(newsByWebsites).map(
    ([websiteName, { quantity, logo }]) => ({
      name: websiteName,
      quantity,
      logo,
      sentiment: (newsByWebsites[websiteName].sentiment / quantity).toFixed(2),
    })
  );

  const instagramPostsByDay = instagramData.posts.reduce(
    (accumulator, item) => {
      const date = new Date(item.pubDate).toLocaleDateString();
      if (!accumulator[date]) {
        accumulator[date] = 0;
      }
      accumulator[date]++;
      return accumulator;
    },
    {} as { [key: string]: number }
  );

  const instagramPostsByDayArray = Object.entries(instagramPostsByDay).map(
    ([date, quantity]) => ({
      date,
      quantity,
    })
  );

  const newsByDay = news.news.reduce((accumulator, item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!accumulator[date]) {
      accumulator[date] = 0;
    }
    accumulator[date]++;
    return accumulator;
  }, {} as { [key: string]: number });

  const newsByDayArray = Object.entries(newsByDay).map(([date, quantity]) => ({
    date,
    quantity,
  }));

  const influencers = instagramData.authorData
    .map((item) => ({
      ...item,
      sentiment: Number((item.sentiment / item.posts).toFixed(2)),
    }))
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 15);

  return {
    sentimentEvolution: {
      instagram: formattedComments.sentimentEvolution,
    },
    engagers: {
      positive: formattedComments.engagers.filter(
        (item) => item.sentiment > 550
      ),
      negative: formattedComments.engagers.filter(
        (item) => item.sentiment < 350
      ),
    },
    commentsByGender: formattedComments.commentByGender,
    commentsBySentiment: formattedComments.commentBySentiment,
    staticData: {
      engagement: instagramData.authorData.reduce(
        (a, b) => a + b.engagement,
        0
      ),
      mentions: data.news.length + data.instagramMention.length,
      userRange: instagramData.authorData.reduce((a, b) => a + b.followers, 0),
    },
    mentionQuantity: {
      news: data.news.length,
      instagram: data.instagramMention.length,
    },
    mentionsByFount: [
      {
        name: "Instagram",
        quantity: data.instagramMention.length,
        sentiment: (
          instagramData.sentiment / data.instagramMention.length
        ).toFixed(2),
      },
      ...newsByWebsitesArray,
    ],
    postsByDay: instagramPostsByDayArray,
    influencers,
    newsByDay: newsByDayArray,
    authors: instagramData.authorData.map((item) => ({
      ...item,
      sentiment: Number((item.sentiment / item.posts).toFixed(2)),
    })),
    posts: {
      news: news.news,
      instagram: instagramData.posts,
    },
  };
};

function classifySentiment(sentimentScore: number) {
  if (sentimentScore > 600) return "positivo";
  if (sentimentScore >= 400 && sentimentScore <= 600) return "neutro";
  return "negativo";
}

const commentFormatter = (
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
  const commentStatisticsData = comments.reduce<Accumulator>(
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
            userName: comment.engager?.name,
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

interface newsData {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
  average: number;
  news: {
    sentiment: number;
    sentimentClassification: string;
    title: string;
    url: string;
    date: Date;
    websiteName: string;
  }[];
}

interface mentionsData {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
  average: number;
  mentions: {
    sentiment: number;
    sentimentClassification: string;
    commentSentiment: number;
    profile: string;
    date: Date;
    comments: {
      id: string;
      text: string;
      sentimentAnalysis: number;
    }[];
    title: string;
    url: string;
  }[];
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
  followers?: number;
}

interface Accumulator {
  sentimentStatistics: SentimentStatistics;
  commentTime: CommentTime;
  commentByGender: CommentByGender;
  dailyStatistics: DailyStatistics;
  engagers: { [id: string]: Engager };
}
