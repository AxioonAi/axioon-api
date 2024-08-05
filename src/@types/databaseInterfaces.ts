import { SexType } from "@prisma/client";

export interface InstagramPostCreateInterface {
  id: string;
  postUrl: string;
  description: string;
  commentCount: number;
  likeCount: number;
  pubDate: Date;
  viewCount: number;
  username: string;
  imgUrl: string;
  postId: string;
  politician_id: string;
  playCount: number;
}

export interface YoutubeCommentCreateInterface {
  id: string;
  text: string;
  likeCount: number;
  replyCount: number;
  author: string;
  video_id: string;
  sentimentAnalysis: number;
}

export interface YoutubeVideoCreateInterface {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  date: Date;
  imgUrl: string;
  viewCount: number;
  commentsCount: number;
  likes: number;
  politician_id: string;
}

export interface YoutubeBaseDataCreateInterface {
  channel_name: string;
  channel_total_views: number;
  channel_total_subs: number;
  channel_total_videos: number;
  date: Date;
  id: string;
  politician_id: string;
}

export interface FacebookPostCommentsCreateInterface {
  id: string;
  postUrl: string;
  text: string;
  likeCount: number;
  date: Date;
  username: string;
  post_id: string;
  authorGender: SexType;
  sentimentAnalysis: number;
}

export interface TiktokCommentsCreateInterface {
  id: string;
  diggCount: number;
  date: Date;
  replyCount: number;
  text: string;
  author: string;
  video_id: string;
  sentimentAnalysis: number;
  tiktokEngagerId?: string;
  authorGender: "MALE" | "FEMALE" | "UNKNOWN";
}

export interface TiktokHashtagCommentCreateInterface {
  id: string;
  diggCount: number;
  date: Date;
  replyCount: number;
  text: string;
  author: string;
  authorGender: "MALE" | "FEMALE" | "UNKNOWN";
  video_id: string;
  hashtagId: string;
  sentimentAnalysis: number;
  tiktokEngagerId?: string;
}

export interface TiktokVideoCreateInterface {
  politician_id: string;
  id: string;
  text: string;
  diggCount: number;
  date: Date;
  shareCount: number;
  commentCount: number;
  playCount: number;
  url: string;
}

export interface TiktokHashtagMentionCreateInterface {
  hashtagId: string;
  id: string;
  text: string;
  diggCount: number;
  date: Date;
  sentimentAnalysis: number;
  shareCount: number;
  commentCount: number;
  playCount: number;
  authorAvatar: string;
  authorName: string;
  url: string;
}

export interface FacebookPostCreateInterface {
  id: string;
  text: string;
  url: string;
  date: Date;
  like: number;
  shares: number;
  comments: number;
  thumbnail: string;
  politician_id: string;
}

export interface InstagramCommentCreateInterface {
  id: string;
  text: string;
  ownerProfilePicUrl: string;
  post_id: string;
  authorGender: "MALE" | "FEMALE" | "UNKNOWN";
  ownerUsername: string;
  timestamp: Date;
  likeCount: number;
  instagramEngagerId?: string;
  sentimentAnalysis: number;
}

export interface InstagramHashtagCommentCreateInterface {
  id: string;
  text: string;
  ownerProfilePicUrl: string;
  post_id: string;
  authorGender: "MALE" | "FEMALE" | "UNKNOWN";
  ownerUsername: string;
  timestamp: Date;
  likeCount: number;
  instagramEngagerId?: string;
  sentimentAnalysis: number;
}

export interface GptCommentDataInterface {
  text: string;
  id: string;
  username?: string;
  ownerUsername?: string;
  author?: string;
}

export interface GptCommentResponseInterface {
  id: string;
  sentimentAnalysis: number;
  authorGender: SexType;
}

export interface TiktokBaseDataCreateInterface {
  fans: number;
  videos: number;
  verified: boolean;
  avatar: string;
  heart: number;
  politician_id: string;
}

export interface InstagramBaseDataCreateInterface {
  politician_id: string;
  followers: number;
  follows: number;
  posts_count: number;
  reels_count: number;
  business: boolean;
  verified: boolean;
  biography: string;
  url: string;
  fullName: string;
  profilePicture: string;
}

export interface FacebookBaseDataCreateInterface {
  likes_count: number;
  title: string;
  followers_count: number;
  politician_id: string;
}

export interface InstagramMentionCreateInterface {
  id: string;
  postUrl: string;
  description: string;
  commentCount: number;
  likeCount: number;
  pubDate: Date;
  viewCount: number;
  username: string;
  imgUrl: string;
  postId: string;
  politician_id: string;
  playCount: number;
  ownerFullName: string;
  ownerUsername: string;
  instagramEngagerId?: string;
  sentimentAnalysis: number;
}

export interface InstagramHashtagMentionCreateInterface {
  id: string;
  postUrl: string;
  description: string;
  commentCount: number;
  likeCount: number;
  pubDate: Date;
  viewCount: number;
  username: string;
  imgUrl: string;
  postId: string;
  hashtagId: string;
  playCount: number;
  ownerFullName: string;
  ownerUsername: string;
  instagramEngagerId?: string;
  sentimentAnalysis: number;
}

export interface GptMentionDataInterface {
  id: string;
  description: string;
}

export interface GptMentionResponseInterface {
  id: string;
  description: string;
  sentimentAnalysis: number;
}

export interface GptNewsDataInterface {
  title: string;
  url: string;
  content: string[];
  last_update: Date;
  users: {
    name: string;
    user_id: string;
  }[];
}

export interface GptNewsResponseInterface {
  title: string;
  users: {
    name: string;
    politician_id: string;
    sentimentAnalysis: number;
  }[];
}

export interface MetaAdvertisingLibCreateInterface {
  id: string;
  politician_id: string;
  impressions_lower_bound: string;
  impressions_upper_bound: string;
  spend_lower_bound: string;
  spend_upper_bound: string;
  currency: string;
  page_name: string;
  bylines: string;
  ad_snapshot_url: string;
  ad_delivery_start_time: Date;
  ad_delivery_stop_time: Date | null;
  ad_creation_time: Date;
}

export interface MetaAdvertisingLibDemographicDistributionCreateInterface {
  age: string;
  gender: string;
  percentage: string;
  advertising_id: string;
}

export interface MetaAdvertisingLibDeliveryByRegionCreateInterface {
  region: string;
  percentage: string;
  advertising_id: string;
}
