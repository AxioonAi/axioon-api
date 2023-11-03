export interface S3NewsNotificationInterface {
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
    data: S3NewsNotificationInterface
  ): Promise<S3NewsNotificationResponseRepository[]>;
}
