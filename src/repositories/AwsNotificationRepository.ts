import {
  AwsNotificationFacebookAdsResponseInterface,
  AwsNotificationFacebookCommentsResponseInterface,
  AwsNotificationFacebookPostResponseInterface,
  AwsNotificationFacebookProfileResponseInterface,
  AwsNotificationInstagramCommentsResponseInterface,
  AwsNotificationInstagramMentionResponseInterface,
  AwsNotificationInstagramPostResponseInterface,
  AwsNotificationInstagramProfileResponseInterface,
  AwsNotificationNewsResponseInterface,
  AwsNotificationTiktokCommentsResponseInterface,
  AwsNotificationTiktokProfileResponseInterface,
  AwsNotificationYoutubeChannelResponseInterface,
  AwsNotificationYoutubeCommentsResponseInterface,
  AwsNotificationYoutubeVideoResponseInterface,
} from "@/@types/awsNotificationInterfaces";

export interface S3NotificationInterface {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

export interface AwsNotificationRepository {
  S3YoutubeCommentsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationYoutubeCommentsResponseInterface[]>;
  S3TiktokCommentsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationTiktokCommentsResponseInterface[]>;
  S3FacebookProfileNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationFacebookProfileResponseInterface[]>;
  S3InstagramProfileNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationInstagramProfileResponseInterface[]>;
  S3InstagramCommentsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationInstagramCommentsResponseInterface[]>;
  S3YoutubeVideoNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationYoutubeVideoResponseInterface[]>;
  S3TiktokProfileNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationTiktokProfileResponseInterface>;
  S3FacebookPostNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationFacebookPostResponseInterface[]>;
  S3FacebookCommentsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationFacebookCommentsResponseInterface[]>;
  S3YoutubeChannelNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationYoutubeChannelResponseInterface[]>;
  S3InstagramPostNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationInstagramPostResponseInterface[]>;
  S3InstagramMentionsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationInstagramMentionResponseInterface[]>;
  S3InstagramMentionsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationInstagramMentionResponseInterface[]>;
  S3FacebookAdsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationFacebookAdsResponseInterface>;
  S3NewsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationNewsResponseInterface[]>;
}
