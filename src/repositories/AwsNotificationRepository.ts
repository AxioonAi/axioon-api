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

export interface S3FacebookNotificationResponse {
  user_id: string;
  likes_count: number;
  followers_count: number;
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
  S3YoutubeNotification(
    data: S3NotificationInterface
  ): Promise<S3YoutubeNotificationResponse[]>;
  S3FacebookNotification(
    data: S3NotificationInterface
  ): Promise<S3FacebookNotificationResponse[]>;
}
