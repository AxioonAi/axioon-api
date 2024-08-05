import {
  AwsNotificationFacebookAdsResponseInterface,
  AwsNotificationFacebookCommentsResponseInterface,
  AwsNotificationFacebookPostResponseInterface,
  AwsNotificationFacebookProfileResponseInterface,
  AwsNotificationInstagramCommentsResponseInterface,
  AwsNotificationInstagramEngagerResponseInterface,
  AwsNotificationInstagramHashtagMentionResponseInterface,
  AwsNotificationInstagramMentionResponseInterface,
  AwsNotificationInstagramPostResponseInterface,
  AwsNotificationInstagramProfileResponseInterface,
  AwsNotificationLegalResponseInterface,
  AwsNotificationNewsResponseInterface,
  AwsNotificationTiktokCommentsResponseInterface,
  AwsNotificationTiktokEngagerResponseInterface,
  AwsNotificationTiktokHashtagMentionResponseInterface,
  AwsNotificationTiktokProfileResponseInterface,
  AwsNotificationYoutubeChannelResponseInterface,
  AwsNotificationYoutubeCommentsResponseInterface,
  AwsNotificationYoutubeVideoResponseInterface,
} from "@/@types/awsNotificationInterfaces";

export interface S3NotificationInterface {
  records: string;
}

export interface AwsNotificationRepository {
  S3LegalNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationLegalResponseInterface[]>;
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
  S3InstagramEngagerNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationInstagramEngagerResponseInterface[]>;
  S3TiktokEngagerNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationTiktokEngagerResponseInterface[]>;
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
  S3InstagramHashtagMentionsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationInstagramHashtagMentionResponseInterface[]>;
  S3TiktokHashtagMentionsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationTiktokHashtagMentionResponseInterface[]>;
  S3FacebookAdsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationFacebookAdsResponseInterface>;
  S3NewsNotification(
    data: S3NotificationInterface
  ): Promise<AwsNotificationNewsResponseInterface[]>;
}
