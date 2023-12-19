import {
  AwsNotificationFacebookCommentsAwsDataInterface,
  AwsNotificationFacebookCommentsResponseInterface,
  AwsNotificationFacebookPostAwsDataInterface,
  AwsNotificationFacebookPostResponseInterface,
  AwsNotificationFacebookProfileAwsDataInterface,
  AwsNotificationFacebookProfileResponseInterface,
  AwsNotificationInstagramCommentsAwsDataInterface,
  AwsNotificationInstagramCommentsResponseInterface,
  AwsNotificationInstagramPostAwsDataInterface,
  AwsNotificationInstagramPostResponseInterface,
  AwsNotificationInstagramProfileAwsDataInterface,
  AwsNotificationInstagramProfileResponseInterface,
  AwsNotificationTiktokCommentsAwsDataInterface,
  AwsNotificationTiktokCommentsResponseInterface,
  AwsNotificationTiktokProfileAwsDataInterface,
  AwsNotificationTiktokProfileFormattedDataInterface,
  AwsNotificationTiktokProfileResponseInterface,
  AwsNotificationYoutubeChannelAwsDataInterface,
  AwsNotificationYoutubeChannelResponseInterface,
  AwsNotificationYoutubeCommentsAwsDataInterface,
  AwsNotificationYoutubeCommentsResponseInterface,
  AwsNotificationYoutubeVideoAwsDataInterface,
  AwsNotificationYoutubeVideoResponseInterface,
} from "@/@types/awsNotificationInterfaces";
import axios from "axios";
import moment from "moment";
import {
  AwsNotificationRepository,
  S3NotificationInterface,
} from "../AwsNotificationRepository";

export class AwsNotificationProductionRepository
  implements AwsNotificationRepository
{
  async S3YoutubeCommentsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationYoutubeCommentsAwsDataInterface[] =
      await axios
        .get(
          `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
        )
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {});

    const formattedData: AwsNotificationYoutubeCommentsResponseInterface[] = [];
    awsData.forEach((item) => {
      if (item.comment) {
        formattedData.push({
          id: item.cid,
          video_id: item.videoId,
          text: item.comment,
          likeCount: item.voteCount ? item.voteCount : 0,
          replyCount: item.replyCount ? item.replyCount : 0,
          author: item.author,
        });
      }
    });

    return formattedData.filter((item) => {
      for (const chave in item) {
        if (item[chave] === null) {
          return false;
        }
      }
      return true;
    });
  }

  async S3TiktokCommentsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationTiktokCommentsAwsDataInterface[] = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {});

    const formattedData: AwsNotificationTiktokCommentsResponseInterface[] = [];

    awsData.forEach((item) => {
      if (item.comment && item.cid) {
        formattedData.push({
          id: item.cid,
          video_id: `${item.submittedVideoUrl.split("/").pop()}`,
          text: item.comment,
          diggCount: item.diggCount,
          date: item.createTimeISO,
          replyCount: item.replyCommentTotal,
          author: item.uniqueId,
        });
      }
    });

    return formattedData;
  }

  async S3InstagramPostNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationInstagramPostAwsDataInterface[] = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const formattedData: AwsNotificationInstagramPostResponseInterface[] =
      awsData.map((item) => {
        return {
          id: item.id,
          postUrl: item.url,
          description: item.caption,
          commentCount: item.commentsCount,
          likeCount: item.likesCount,
          pubDate: item.timestamp,
          viewCount: item.type === "Video" ? item.videoViewCount : 0,
          playCount: item.type === "Video" ? item.videoPlayCount : 0,
          username: item.ownerUsername,
          imgUrl: item.displayUrl,
          postId: item.id,
          politician_id: item.instagram_id,
        };
      });

    return formattedData.filter((item) => item.politician_id);
  }

  async S3NewsNotification(data: S3NotificationInterface) {
    const awsData = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const format = awsData.map((item: any) => {
      return {
        title: item.title,
        url: item.link,
        last_update: moment(item.updated).toDate(),
        users: item.users.map((user: any) => {
          return {
            user_id: user.id,
          };
        }),
      };
    });

    return format;
  }

  async S3MetaAdvertisingNotification(data: S3NotificationInterface) {
    const awsData = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    return awsData;
  }

  async S3YoutubeVideoNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationYoutubeVideoAwsDataInterface[] = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const formattedData: AwsNotificationYoutubeVideoResponseInterface[] =
      awsData.map((item) => {
        return {
          id: item.id,
          title: item.title,
          url: item.url,
          duration: item.duration,
          viewCount: item.viewCount,
          commentsCount: item.commentsCount,
          likes: item.likes ? item.likes : 0,
          date: moment(item.date.replace("~", "")).toDate(),
          description: item.text,
          imgUrl: item.thumbnailUrl,
          politician_id: item.channel_id,
        };
      });

    return formattedData;
  }
  async S3FacebookProfileNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationFacebookProfileAwsDataInterface[] =
      await axios
        .get(
          `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
        )
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });

    const formattedData: AwsNotificationFacebookProfileResponseInterface[] = [];

    awsData.forEach((item) => {
      if (item.likes) {
        formattedData.push({
          politician_id: item.facebook_id,
          title: item.title,
          likes_count: item.likes,
          followers_count: item.followers,
        });
      }
    });

    return formattedData;
  }

  async S3InstagramCommentsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationInstagramCommentsAwsDataInterface[] =
      await axios
        .get(
          `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
        )
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });

    const commentData: AwsNotificationInstagramCommentsResponseInterface[] = [];

    awsData.forEach((item) => {
      commentData.push({
        id: item.id,
        text: item.text,
        ownerProfilePicUrl: item.ownerProfilePicUrl,
        post_id: item.postUrl.replace("https://www.instagram.com/p/", ""),
        politician_id: item.instagram_id,
        ownerUsername: item.ownerUsername,
        timestamp: item.timestamp,
        likeCount: item.likesCount,
      });
    });

    return commentData;
  }

  async S3InstagramMentionsNotification(data: S3NotificationInterface) {
    const awsData = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const mentionData: any[] = [];
    const commentData: any[] = [];

    awsData.forEach((item: any) => {
      if (item.instagram_id) {
        mentionData.push({
          id: item.id,
          postUrl: item.url,
          description: item.caption,
          commentCount: item.commentsCount,
          likeCount: item.likesCount,
          pubDate: item.timestamp,
          viewCount: item.type === "video" ? item.videoViewCount : 0,
          playCount: item.type === "video" ? item.videoPlayCount : 0,
          username: item.ownerUsername,
          imgUrl: item.displayUrl,
          postId: item.id,
          politician_id: item.instagram_id,
          ownerFullName: item.ownerFullName,
          ownerUsername: item.ownerUsername,
        });

        item.latestComments.forEach((comment: any) => {
          commentData.push({
            id: comment.id,
            text: comment.text,
            ownerProfilePicUrl: comment.ownerProfilePicUrl,
            post_id: item.id,
            politician_id: item.instagram_id,
            ownerUsername: comment.ownerUsername,
            timestamp: comment.timestamp,
            likeCount: comment.likesCount,
          });
        });
      }
    });

    return {
      mentionData,
      commentData,
    };
  }

  async S3InstagramProfileNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationInstagramProfileAwsDataInterface[] =
      await axios
        .get(
          `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
        )
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });

    const formattedData: AwsNotificationInstagramProfileResponseInterface[] =
      awsData.map((item) => {
        return {
          politician_id: item.instagram_id,
          followers: item.followersCount,
          follows: item.followsCount,
          posts_count: item.postsCount,
          reels_count: item.igtvVideoCount,
          business: item.isBusinessAccount,
          verified: item.verified,
          biography: item.biography,
          url: item.url,
          fullName: item.fullName,
          profilePicture: item.profilePicUrlHD,
        };
      });

    return formattedData;
  }
  async S3TiktokProfileNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationTiktokProfileAwsDataInterface[] = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const formattedData: AwsNotificationTiktokProfileFormattedDataInterface =
      {};

    for (const item of awsData) {
      if (!formattedData[item.tiktok_id]) {
        formattedData[item.tiktok_id] = {
          videos: [],
          profile: {
            fans: item.authorMeta.fans,
            videos: item.authorMeta.video,
            verified: item.authorMeta.verified,
            politician_id: item.tiktok_id,
            avatar: item.authorMeta.avatar,
            heart: item.authorMeta.heart,
          },
        };
      }

      formattedData[item.tiktok_id].videos = [
        ...formattedData[item.tiktok_id].videos,
        {
          id: item.id,
          text: item.text,
          diggCount: item.diggCount,
          shareCount: item.shareCount,
          playCount: item.playCount,
          commentCount: item.commentCount,
          date: item.createTimeISO,
          url: item.webVideoUrl,
          politician_id: item.tiktok_id,
        },
      ];
    }

    const finalData: AwsNotificationTiktokProfileResponseInterface = {
      profileData: [],
      videoData: [],
    };

    for (const key in formattedData) {
      if (formattedData.hasOwnProperty(key)) {
        finalData.videoData.push(...formattedData[key].videos);
        finalData.profileData.push(formattedData[key].profile);
      }
    }

    return finalData;
  }

  async S3FacebookPostNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationFacebookPostAwsDataInterface[] = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const formattedData: AwsNotificationFacebookPostResponseInterface[] =
      awsData.map((item) => {
        return {
          id: item.postId,
          text: item.text,
          url: item.url,
          date: item.time,
          like: item.likes,
          shares: item.shares,
          comments: item.comments,
          thumbnail:
            item.media && item.media[0]
              ? item.media[0].thumbnail
              : "https://tm.ibxk.com.br/2023/09/21/21105542136038.jpg",
          politician_id: item.facebook_id,
        };
      });

    return formattedData;
  }

  async S3FacebookAdsNotification(data: S3NotificationInterface) {
    const awsData = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const advertisingData: any = [];
    const deliveryRegionData: any = [];
    const demographicDistributionData: any = [];

    awsData.forEach((element: any) => {
      element.data.forEach((item: any) => {
        advertisingData.push({
          id: item.id,
          politician_id: element.Meta_id,
          ad_creation_time: moment(item.ad_creation_time).toDate(),
          ad_delivery_stop_time: moment(item.ad_delivery_stop_time).toDate(),
          ad_delivery_start_time: moment(item.ad_delivery_start_time).toDate(),
          ad_snapshot_url: item.ad_snapshot_url,
          currency: item.currency,
          page_name: item.page_name,
          bylines: item.bylines,
          spend_lower_bound: item.spend.lower_bound,
          spend_upper_bound: item.spend.upper_bound,
          impressions_lower_bound: item.impressions.lower_bound,
          impressions_upper_bound: item.impressions.upper_bound,
        });

        item.delivery_by_region.forEach((region: any) => {
          deliveryRegionData.push({
            region: region.region,
            advertising_id: item.id,
            percentage: region.percentage,
          });
        });

        item.demographic_distribution.forEach((distribution: any) => {
          demographicDistributionData.push({
            advertising_id: item.id,
            age: distribution.age,
            gender: distribution.gender,
            percentage: distribution.percentage,
          });
        });
      });
    });

    return {
      advertisingData,
      deliveryRegionData,
      demographicDistributionData,
    };
  }

  async S3FacebookCommentsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationFacebookCommentsAwsDataInterface[] =
      await axios
        .get(
          `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
        )
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });

    const formattedData: AwsNotificationFacebookCommentsResponseInterface[] =
      awsData.map((item) => {
        return {
          id: item.id,
          postUrl: item.facebookUrl,
          text: item.text,
          likeCount: item.likesCount,
          date: item.date,
          username: item.profileName,
          post_id: item.facebookId,
        };
      });

    return formattedData;
  }

  async S3YoutubeChannelNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationYoutubeChannelAwsDataInterface[] = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const formattedData: AwsNotificationYoutubeChannelResponseInterface[] =
      awsData.map((item) => {
        return {
          id: item.id,
          channel_name: item.channelName,
          channel_total_views: parseFloat(
            item.channelTotalViews.replace(",", "")
          ),
          channel_total_subs: item.numberOfSubscribers
            ? item.numberOfSubscribers
            : 0,
          channel_total_videos: item.channelTotalVideos,
          date: moment().toDate(),
          politician_id: item.channel_id,
        };
      });

    return formattedData;
  }
}
