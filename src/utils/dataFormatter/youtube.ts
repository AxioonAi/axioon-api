export const youtubeDataFormatter = (
  data: {
    id: string;
    title: string;
    url: string;
    duration: string;
    viewCount: number;
    commentsCount: number;
    likes: number;
    date: Date;
    description: string;
    imgUrl: string;
    politician_id: string;
    created_at: Date;
  }[],
  channelFollowers: number
) => {
  const mostWatchedVideo = data.sort((a, b) => b.viewCount - a.viewCount)[0];
  const mostLikedVideo = data.sort((a, b) => b.likes - a.likes)[0];
  const mostCommentedVideo = data.sort(
    (a, b) => b.commentsCount - a.commentsCount
  );
  const mostOldVideo = data.sort((a, b) => {
    return a.date < b.date ? -1 : 1;
  })[0];
  const oldVideoDateDiff = Math.ceil(
    Math.abs(Date.now() - new Date(mostOldVideo.date).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const dataWithEngagement = [];

  for (const key in data) {
    const timeDiff =
      Math.abs(Date.now() - new Date(data[key].date).getTime()) /
      (1000 * 60 * 60 * 24);

    const engagementSum =
      data[key].commentsCount * data[key].likes * 1.2 + data[key].viewCount * 1;

    const dateDiffRelation = 1 - timeDiff / oldVideoDateDiff;

    const engagement =
      (engagementSum * dateDiffRelation) / 100 / (channelFollowers / 1000);

    dataWithEngagement.push({
      ...data[key],
      engagement,
    });
  }

  const rankByEngagement = dataWithEngagement.sort((a, b) => {
    return b.engagement - a.engagement;
  });

  const mostRankedVideo = rankByEngagement[0];

  const finalData: any = [];
  rankByEngagement.forEach((item) => {
    return finalData.push({
      ...item,
      percentage: (item.engagement / mostRankedVideo.engagement) * 100,
    });
  });

  return {
    mostWatchedVideo,
    mostLikedVideo,
    mostCommentedVideo,
    mostOldVideo,
    mostRankedVideo,
    finalData,
  };
};
