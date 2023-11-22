export const FacebookDataFormatter = (
  data: {
    id: string;
    url: string;
    text: string;
    date: Date;
    like: number;
    comments: number;
    shares: number;
    thumbnail: string;
  }[],
  followers: number
) => {
  const mostLikedPost = data.sort((a, b) => b.like - a.like)[0];
  const mostCommentedPost = data.sort((a, b) => b.comments - a.comments)[0];
  const mostSharedPost = data.sort((a, b) => b.shares - a.shares)[0];
  const mostOldPost = data.sort((a, b) => {
    return a.date < b.date ? -1 : 1;
  })[0];

  const oldPostDateDiff = Math.ceil(
    Math.abs(Date.now() - new Date(mostOldPost.date).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const dataWithEngagement = [];

  for (const key in data) {
    const timeDiff =
      Math.abs(Date.now() - new Date(data[key].date).getTime()) /
      (1000 * 60 * 60 * 24);

    const engagementSum =
      data[key].comments * 1 + data[key].like * 1 + data[key].shares * 1;

    const dateDiffRelation = 1 - timeDiff / oldPostDateDiff;

    const engagement =
      (engagementSum * dateDiffRelation) / 100 / (followers / 1000);

    dataWithEngagement.push({
      ...data[key],
      engagement,
    });
  }

  const rankByEngagement = dataWithEngagement.sort((a, b) => {
    return b.engagement - a.engagement;
  });

  const mostRankedPost = rankByEngagement[0];

  const finalData: any = [];
  rankByEngagement.forEach((item) => {
    return finalData.push({
      ...item,
      percentage: (item.engagement / mostRankedPost.engagement) * 100,
    });
  });

  return {
    mostLikedPost,
    mostCommentedPost,
    mostSharedPost,
    mostOldPost,
    finalData,
  };
};
