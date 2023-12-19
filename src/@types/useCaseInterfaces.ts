export interface FacebookDataFormatterFinalDataInterface {
  percentage: number;
  engagement: number;
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
  }[];
  sentiment: number;
  id: string;
  url: string;
  text: string;
  date: Date;
  like: number;
  shares: number;
  thumbnail: string;
}

export interface YoutubeDataFormatterFinalDataInterface {
  percentage: number;
  engagement: number;
  comments: {
    id: string;
    text: string;
    likeCount: number;
    replyCount: number;
    author: string;
    video_id: string;
    sentimentAnalysis: number;
  }[];
  sentiment: number;
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
}

export interface TiktokDataFormatterFinalDataInterface {
  percentage: number;
  engagement: number;
  comments: {
    id: string;
    diggCount: number;
    date: Date;
    replyCount: number;
    author: string;
    video_id: string;
    text: string;
    sentimentAnalysis: number;
  }[];
  sentiment: number;
  id: string;
  text: string;
  url: string;
  diggCount: number;
  commentCount: number;
  shareCount: number;
  playCount: number;
  date: Date;
}

export interface InstagramDataFormatterFinalDataInterface {
  percentage: number;
  engagement: number;
  comments: {
    id: string;
    text: string;
    post_id: string;
    ownerUsername: string;
    ownerProfilePicUrl: string;
    timestamp: string;
    likeCount: number;
    sentimentAnalysis: number;
  }[];
  sentiment: number;
  id: string;
  postUrl: string;
  description: string;
  commentCount: number;
  likeCount: number;
  pubDate: Date;
  viewCount: number;
  playCount: number;
}

export interface CommentWordCountDataInterface {
  instagramPostComments: {
    text: string;
  }[];
  facebookPostComments: {
    text: string;
  }[];
  tiktokComments: {
    text: string;
  }[];
  youtubeCommentData: {
    text: string;
  }[];
}
