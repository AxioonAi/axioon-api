export const EngagementDataFormatter = (data: {
  instagramPosts: {
    id: string;
    postUrl: string;
    description: string;
    commentCount: number;
    likeCount: number;
    pubDate: Date;
    viewCount: number;
    playCount: number;
  }[];
  tiktokVideoData: {
    id: string;
    text: string;
    url: string;
    diggCount: number;
    commentCount: number;
    shareCount: number;
    playCount: number;
    date: Date;
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
  youtubeVideoData: {
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
  }[];
}) => {
  const engagement = {
    facebook: {
      likes: 0,
      comments: 0,
      shares: 0,
    },
    instagram: {
      likes: 0,
      comments: 0,
    },
    tiktok: {
      digg: 0,
      comments: 0,
      play: 0,
    },
    youtube: {
      likes: 0,
      comments: 0,
      views: 0,
    },
  };

  data.facebookPosts.forEach((post) => {
    engagement.facebook.likes += post.like;
    engagement.facebook.comments += post.comments;
    engagement.facebook.shares += post.shares;
  });

  data.instagramPosts.forEach((post) => {
    engagement.instagram.likes += post.likeCount;
    engagement.instagram.comments += post.commentCount;
  });

  data.tiktokVideoData.forEach((post) => {
    engagement.tiktok.digg += post.diggCount;
    engagement.tiktok.comments += post.commentCount;
    engagement.tiktok.play += post.playCount;
  });

  data.youtubeVideoData.forEach((post) => {
    engagement.youtube.likes += post.likes;
    engagement.youtube.comments += post.commentsCount;
    engagement.youtube.views += post.viewCount;
  });

  return engagement;
};
