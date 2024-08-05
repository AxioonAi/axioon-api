export interface YoutubeDataFormatterInterface {
  youtubeBaseData: YoutubeDataFormatterBaseDataInterface[];
  youtubeVideoData: YoutubeDataFormatterVideoDataInterface[];
  youtubeCommentData: YoutubeDataFormatterCommentDataInterface[];
}

export interface YoutubeDataFormatterVideoDataInterface {
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

export interface YoutubeDataFormatterCommentDataInterface {
  id: string;
  text: string;
  likeCount: number;
  replyCount: number;
  author: string;
  authorGender: string;
  video_id: string;
  sentimentAnalysis: number;
}

export interface YoutubeDataFormatterBaseDataInterface {
  id: string;
  channel_name: string;
  date: Date;
  channel_total_views: number;
  channel_total_subs: number;
  channel_total_videos: number;
}
