export const tiktokDataFormatter = (
  data: {
    id: string;
    text: string;
    playCount: number;
    diggCount: number;
    commentCount: number;
    shareCount: number;
    date: Date;
  }[],
  channelFollowers: number
) => {
  const mostWatchedVideo = data.sort((a, b) => b.playCount - a.playCount)[0];
  const mostLikedVideo = data.sort((a, b) => b.diggCount - a.diggCount)[0];
  const mostCommentedVideo = data.sort(
    (a, b) => b.commentCount - a.commentCount
  )[0];
  const mostOldVideo = data.sort((a, b) => {
    return a.date < b.date ? -1 : 1;
  })[0];
  const mostSharedVideo = data.sort((a, b) => b.shareCount - a.shareCount)[0];

  const oldVideoDateDiff = Math.ceil(
    Math.abs(Date.now() - new Date(mostOldVideo.date).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const dataWithEngagement: any[] = [];

  for (const key in data) {
    const timeDiff =
      Math.abs(Date.now() - new Date(data[key].date).getTime()) /
      (1000 * 60 * 60 * 24);

    const engagementSum =
      data[key].diggCount * 1 +
      data[key].commentCount * 1 +
      data[key].shareCount * 1 +
      data[key].playCount * 1;

    const dataDiffRelation = 1 - timeDiff / oldVideoDateDiff;

    const engagement =
      (engagementSum * dataDiffRelation) / (channelFollowers * timeDiff);

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
    mostSharedVideo,
    mostRankedVideo,
    finalData,
  };
};
