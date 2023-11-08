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

export interface AwsNotificationRepository {
  S3NewsNotification(
    data: S3NotificationInterface
  ): Promise<S3NewsNotificationResponseRepository[]>;
  S3MetaAdvertisingNotification(
    data: S3NotificationInterface
  ): Promise<S3NewsNotificationResponseRepository[]>;
  S3YoutubeNotification(
    data: S3NotificationInterface
  ): Promise<S3NewsNotificationResponseRepository[]>;
}
