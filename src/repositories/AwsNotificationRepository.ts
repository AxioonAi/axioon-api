export interface S3NotificationInterface {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

export interface S3NewsNotificationResponseRepository {
  title: string;
  url: string;
  last_update: Date;
  users: [
    {
      user_id: string;
    }
  ];
}

export interface S3YoutubeNotificationResponse {
  id: string;
  videos: {
    title: string;
    description: string;
    url: string;
    duration: string;
    date: Date;
    imgUrl: string;
    viewCount: number;
    commentsCount: number;
    likes: number;
  }[];
  channelData: {
    channelName: string;
    channelTotalViews: number;
    channelTotalSubscribers: number;
    date: Date;
  };
}

export interface S3FacebookProfileNotificationResponse {
  user_id: string;
  likes_count: number;
  followers_count: number;
  start_of_period: Date;
  end_of_period: Date;
}

export interface S3InstagramCommentsNotificationResponse {
  postData: {
    id: string;
    postUrl: string;
    description: string;
    commentCount: number;
    likeCount: number;
    pubDate: Date;
    viewCount: number;
    username: string;
    imgUrl: string;
    playCount: number;
    postId: string;
    query: string;
    politician_id: string;
  }[];
  commentData: {
    text: string;
    id: string;
    politician_id: string;
    ownerProfilePicUrl: string;
    post_id: string;
    ownerUsername: string;
    timestamp: string;
    likeCount: number;
  }[];
}

export interface S3InstagramMentionsNotificationResponse {
  mentionData: {
    id: string;
    postUrl: string;
    description: string;
    commentCount: number;
    likeCount: number;
    pubDate: Date;
    viewCount: number;
    username: string;
    imgUrl: string;
    playCount: number;
    postId: string;
    query: string;
    user_id: string;
    ownerFullName: string;
    ownerUsername: string;
  }[];
  commentData: {
    text: string;
    ownerProfilePicUrl: string;
    post_id: string;
    ownerUsername: string;
    timestamp: string;
    likeCount: number;
  }[];
}

interface InstagramBaseDataNotificationResponse {
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
  start_of_period: Date;
  end_of_period: Date;
}

export interface AwsNotificationRepository {
  S3NewsNotification(
    data: S3NotificationInterface
  ): Promise<S3NewsNotificationResponseRepository[]>;
  S3MetaAdvertisingNotification(
    data: S3NotificationInterface
  ): Promise<S3NewsNotificationResponseRepository[]>;
  S3FacebookProfileNotification(
    data: S3NotificationInterface
  ): Promise<S3FacebookProfileNotificationResponse[]>;
  S3InstagramMentionsNotification(
    data: S3NotificationInterface
  ): Promise<S3InstagramMentionsNotificationResponse>;
  S3InstagramProfileNotification(
    data: S3NotificationInterface
  ): Promise<InstagramBaseDataNotificationResponse[]>;
  S3InstagramCommentsNotification(data: S3NotificationInterface): Promise<any>;
  S3YoutubeVideoNotification(data: S3NotificationInterface): Promise<any[]>;
  S3TiktokProfileNotification(data: S3NotificationInterface): Promise<any>;
  S3FacebookPostNotification(data: S3NotificationInterface): Promise<any>;
  S3FacebookAdsNotification(data: S3NotificationInterface): Promise<any>;
  S3FacebookCommentsNotification(data: S3NotificationInterface): Promise<any>;
  S3YoutubeChannelNotification(data: S3NotificationInterface): Promise<any>;
  S3YoutubeCommentsNotification(data: S3NotificationInterface): Promise<any>;
  S3TiktokCommentsNotification(data: S3NotificationInterface): Promise<any>;
  S3InstagramPostNotification(data: S3NotificationInterface): Promise<any>;
}
