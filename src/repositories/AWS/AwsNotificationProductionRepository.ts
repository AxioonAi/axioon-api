import {
  AwsNotificationFacebookAdsAwsDataInterface,
  AwsNotificationFacebookAdsResponseInterface,
  AwsNotificationFacebookCommentsAwsDataInterface,
  AwsNotificationFacebookCommentsResponseInterface,
  AwsNotificationFacebookPostAwsDataInterface,
  AwsNotificationFacebookPostResponseInterface,
  AwsNotificationFacebookProfileAwsDataInterface,
  AwsNotificationFacebookProfileResponseInterface,
  AwsNotificationInstagramCommentsAwsDataInterface,
  AwsNotificationInstagramCommentsResponseInterface,
  AwsNotificationInstagramEngagerResponseInterface,
  AwsNotificationInstagramHashtagMentionAwsDataInterface,
  AwsNotificationInstagramHashtagMentionResponseInterface,
  AwsNotificationInstagramMentionAwsDataInterface,
  AwsNotificationInstagramMentionResponseInterface,
  AwsNotificationInstagramPostAwsDataInterface,
  AwsNotificationInstagramPostResponseInterface,
  AwsNotificationInstagramProfileAwsDataInterface,
  AwsNotificationInstagramProfileResponseInterface,
  AwsNotificationLegalDataInterface,
  AwsNotificationLegalResponseInterface,
  AwsNotificationNewsAwsDataInterface,
  AwsNotificationNewsResponseInterface,
  AwsNotificationTiktokCommentsAwsDataInterface,
  AwsNotificationTiktokCommentsResponseInterface,
  AwsNotificationTiktokEngagerAwsDataInterface,
  AwsNotificationTiktokEngagerResponseInterface,
  AwsNotificationTiktokHashtagMentionAwsDataInterface,
  AwsNotificationTiktokHashtagMentionResponseInterface,
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
import { env } from "@/env";
import { AwsError } from "@/helper/errors/AwsError";
import { Status } from "@prisma/client";
import axios from "axios";
import { randomUUID } from "crypto";
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
        .get(`${env.AWS_URL}${data.records}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {});

    const formattedData: AwsNotificationYoutubeCommentsResponseInterface[] = [];

    for (const item of awsData) {
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
    }

    return formattedData.filter((item) => {
      for (const chave in item) {
        if (item[chave] === null) {
          return false;
        }
      }
      return true;
    });
  }

  async S3LegalNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationLegalDataInterface = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {});

    const formattedData: AwsNotificationLegalResponseInterface[] = [];

    for (const item of awsData.items) {
      const relevantData: {
        subject: string | null;
        judgingBy: string | null;
        causeValue: string | null;
        court: string | null;
        url: string | null;
        class: string | null;
        area: string | null;
        system: string | null;
        justiceSecret: boolean;
        degree: string | null;
      } = {
        subject: null,
        judgingBy: null,
        causeValue: null,
        court: null,
        url: null,
        class: null,
        area: null,
        system: null,
        justiceSecret: false,
        degree: null,
      };

      for (const fount of item.fontes) {
        if (fount.capa?.assunto) relevantData.subject = fount.capa.assunto;
        if (fount.capa?.orgao_julgador)
          relevantData.judgingBy = fount.capa.orgao_julgador;
        if (fount.capa?.valor_causa)
          relevantData.causeValue = fount.capa?.valor_causa.valor_formatado;
        if (fount.tribunal?.nome) relevantData.court = fount.tribunal.nome;
        if (fount.url) relevantData.url = fount.url;
        if (fount.capa?.classe) relevantData.class = fount.capa.classe;
        if (fount.capa?.area) relevantData.area = fount.capa.area;
        if (fount.sistema) relevantData.system = fount.sistema;
        if (fount.segredo_justica)
          relevantData.justiceSecret = fount.segredo_justica;
        if (fount.grau_formatado) relevantData.degree = fount.grau_formatado;
      }

      formattedData.push({
        id: item.numero_cnj,
        activePole: item.titulo_polo_ativo,
        passivePole: item.titulo_polo_passivo,
        startDate: moment(item.data_inicio).toDate(),
        lastUpdate: moment(item.data_ultima_movimentacao).toDate(),
        ...relevantData,
        politician_id: awsData.user_id,
      });
    }

    return formattedData;
  }

  async S3TiktokCommentsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationTiktokCommentsAwsDataInterface[] = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {});

    const formattedData: AwsNotificationTiktokCommentsResponseInterface[] = [];
    for (const item of awsData) {
      if (item.text && item.cid) {
        formattedData.push({
          id: item.cid,
          video_id: `${item.submittedVideoUrl.split("/").pop()}`,
          text: item.text,
          diggCount: item.diggCount,
          date: item.createTimeISO,
          replyCount: item.replyCommentTotal,
          author: item.uniqueId,
        });
      }
    }

    return formattedData;
  }

  async S3InstagramPostNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationInstagramPostAwsDataInterface[] = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw new AwsError();
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
    const awsData: AwsNotificationNewsAwsDataInterface[] = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw new AwsError();
      });

    const format: AwsNotificationNewsResponseInterface[] = awsData.map(
      (item) => {
        return {
          title: item.title,
          url: item.link,
          content: item.content,
          website_id: item.site_id ?? null,
          last_update: moment(item.updated).isValid()
            ? moment(item.updated).toDate()
            : moment().toDate(),
          users: item.users.map((user) => {
            return {
              name: user.name,
              user_id: user.id,
            };
          }),
        };
      }
    );

    const groupedData = format.reduce(
      (acc: AwsNotificationNewsResponseInterface[], item) => {
        const existingItem = acc.find((obj) => obj.title === item.title);
        if (existingItem) {
          existingItem.users.push(...item.users);
        } else {
          acc.push({ ...item });
        }
        return acc;
      },
      []
    );

    const finalData: AwsNotificationNewsResponseInterface[] = [];

    for (const item of groupedData) {
      const seen = new Set();
      const users = item.users.filter((obj) => {
        if (seen.has(obj.user_id)) {
          return false;
        }
        seen.add(obj.user_id);
        return true;
      });

      finalData.push({ ...item, users });
    }

    return finalData;
  }

  async S3MetaAdvertisingNotification(data: S3NotificationInterface) {
    const awsData = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw new AwsError();
      });

    return awsData;
  }

  async S3YoutubeVideoNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationYoutubeVideoAwsDataInterface[] = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw new AwsError();
      });

    const formattedData: AwsNotificationYoutubeVideoResponseInterface[] =
      awsData
        .map((item) => {
          if (item.channel_id && item.channel_id.length === 36) {
            return {
              id: item.video_id,
              title: item.video_title,
              url: item.video_url,
              duration: item.video_duration || "0",
              viewCount: item.video_views,
              commentsCount: item.video_comments ? item.video_comments : 0,
              likes: item.video_likes ? item.video_likes : 0,
              date: moment(item.video_date.replace("~", "")).toDate(),
              description: item.video_text,
              imgUrl: item.video_thumbnail,
              politician_id: item.channel_id,
            };
          }
        })
        .filter(
          (item) => item !== undefined
        ) as AwsNotificationYoutubeVideoResponseInterface[];

    return formattedData;
  }

  async S3FacebookProfileNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationFacebookProfileAwsDataInterface[] =
      await axios
        .get(`${env.AWS_URL}${data.records}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw new AwsError();
        });

    const formattedData: AwsNotificationFacebookProfileResponseInterface[] = [];

    for (const item of awsData) {
      if (item.likes) {
        formattedData.push({
          politician_id: item.facebook_id,
          title: item.title,
          likes_count: item.likes,
          followers_count: item.followers,
        });
      }
    }

    return formattedData;
  }

  async S3InstagramCommentsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationInstagramCommentsAwsDataInterface[] =
      await axios
        .get(`${env.AWS_URL}${data.records}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw new AwsError();
        });

    const commentData: AwsNotificationInstagramCommentsResponseInterface[] = [];

    for (const item of awsData) {
      if (item.text) {
        commentData.push({
          id: item.id,
          text: item.text,
          ownerProfilePicUrl: item.ownerProfilePicUrl,
          post_id: item.postUrl.replace("https://www.instagram.com/p/", ""),
          ownerUsername: item.ownerUsername,
          timestamp: item.timestamp,
          likeCount: item.likesCount,
        });
      }
    }

    return commentData;
  }

  async S3InstagramMentionsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationInstagramMentionAwsDataInterface[] =
      await axios
        .get(`${env.AWS_URL}${data.records}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw new AwsError();
        });

    console.log(awsData);

    const mentionData: AwsNotificationInstagramMentionResponseInterface[] = [];

    for (const item of awsData) {
      if (item.instagram_id) {
        mentionData.push({
          id: item.id,
          postUrl: item.url,
          description: item.caption,
          commentCount: item.commentsCount,
          likeCount: item.likesCount ? item.likesCount : 1,
          pubDate: item.timestamp,
          viewCount: item.type === "video" ? item.videoViewCount : 0,
          playCount: item.type === "video" ? item.videoPlayCount : 0,
          username: item.ownerUsername,
          imgUrl: item.displayUrl,
          postId: item.id,
          politician_id: item.instagram_id,
          ownerFullName: item.ownerFullName,
          ownerUsername: item.ownerUsername,
          hashtags: item.hashtags && item.hashtags.join(" "),
        });
      }
    }

    return mentionData;
  }

  async S3InstagramHashtagMentionsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationInstagramHashtagMentionAwsDataInterface[] =
      await axios
        .get(`${env.AWS_URL}${data.records}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw new AwsError();
        });

    const mentionData: AwsNotificationInstagramHashtagMentionResponseInterface[] =
      [];

    for (const item of awsData) {
      if (item.hashtag_id) {
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
          hashtagId: item.hashtag_id,
          ownerFullName: item.ownerFullName,
          ownerUsername: item.ownerUsername,
          hashtags: item.hashtags.join(" "),
        });
      }
    }

    return mentionData;
  }

  async S3InstagramProfileNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationInstagramProfileAwsDataInterface[] =
      await axios
        .get(`${env.AWS_URL}${data.records}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw new AwsError();
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

  async S3InstagramEngagerNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationInstagramProfileAwsDataInterface[] =
      await axios
        .get(`${env.AWS_URL}${data.records}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw new AwsError();
        });

    const formattedData: AwsNotificationInstagramEngagerResponseInterface[] =
      awsData.map((item) => {
        return {
          engagerId: item.instagram_id,
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
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw new AwsError();
      });

    const formattedData: AwsNotificationTiktokProfileFormattedDataInterface =
      {};

    for (const item of awsData) {
      if (!formattedData[item.tiktok_id] && item.authorMeta) {
        formattedData[item.tiktok_id] = {
          videos: [],
          profile: {
            fans: item.authorMeta.fans,
            videos: item.authorMeta.video,
            name: item.authorMeta.name,
            nickname: item.authorMeta.nickName,
            verified: item.authorMeta.verified,
            politician_id: item.tiktok_id,
            avatar: item.authorMeta.avatar,
            heart: item.authorMeta.heart,
          },
        };
      }

      if (formattedData[item.tiktok_id] && item.id) {
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
    }

    const finalData: AwsNotificationTiktokProfileResponseInterface = {
      profileData: [],
      videoData: [],
    };

    for (const key in formattedData) {
      // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
      if (formattedData.hasOwnProperty(key)) {
        finalData.videoData.push(...formattedData[key].videos);
        finalData.profileData.push(formattedData[key].profile);
      }
    }

    return finalData;
  }

  async S3TiktokEngagerNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationTiktokEngagerAwsDataInterface[] = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw new AwsError();
      });

    const formattedData: AwsNotificationTiktokEngagerResponseInterface[] =
      awsData.map((item) => {
        if (item.authorMeta) {
          return {
            engagerId: item.tiktok_id,
            fans: item.authorMeta.fans,
            verified: item.authorMeta.verified,
            avatar: item.authorMeta.avatar,
            heart: item.authorMeta.heart,
          };
        }

        return {
          engagerId: item.tiktok_id,
          fans: item.fans,
          verified: item.verified,
          avatar: item.avatar,
          heart: item.heart,
        };
      });

    return formattedData;
  }

  async S3TiktokHashtagMentionsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationTiktokHashtagMentionAwsDataInterface[] =
      await axios
        .get(`${env.AWS_URL}${data.records}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw new AwsError();
        });

    const formattedData: AwsNotificationTiktokHashtagMentionResponseInterface[] =
      awsData.map((item) => {
        const url = item.webVideoUrl.split("/");
        return {
          authorAvatar: item.authorMeta.avatar,
          authorName: item.authorMeta.name,
          commentCount: item.commentCount,
          date: item.createTimeISO,
          description: item.text,
          diggCount: item.diggCount,
          hashtagId: item.hashtag_id,
          playCount: item.playCount,
          shareCount: item.shareCount,
          url: item.webVideoUrl,
          id: url[url.length - 1],
        };
      });

    return formattedData.filter((item) => item.hashtagId);
  }

  async S3FacebookPostNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationFacebookPostAwsDataInterface[] = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw new AwsError();
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
          comments: item.comments ?? 0,
          thumbnail:
            item.media && item.media?.[0]
              ? item.media[0].thumbnail
              : "https://tm.ibxk.com.br/2023/09/21/21105542136038.jpg",
          politician_id: item.facebook_id,
        };
      });

    return formattedData;
  }

  async S3FacebookAdsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationFacebookAdsAwsDataInterface[] = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log("error", err);
        throw new AwsError();
      });

    const formattedData: AwsNotificationFacebookAdsResponseInterface = {
      advertisingData: [],
      deliveryRegionData: [],
      demographicDistributionData: [],
    };

    console.log(awsData.length);

    for (const element of awsData) {
      for (const item of element.data) {
        formattedData.advertisingData.push({
          id: item.id,
          politician_id: element.Meta_id,
          ad_creation_time: moment(item.ad_creation_time).toDate(),
          ad_delivery_start_time: moment(item.ad_delivery_stop_time).toDate(),
          ad_delivery_stop_time: item.ad_delivery_stop_time
            ? moment(item.ad_delivery_stop_time).toDate()
            : null,
          ad_snapshot_url: item.ad_snapshot_url,
          currency: item.currency,
          page_name: item.page_name,
          status: item.ad_delivery_stop_time ? Status.INACTIVE : Status.ACTIVE,
          bylines: item.bylines,
          spend_lower_bound: item.spend.lower_bound,
          spend_upper_bound: item.spend.upper_bound,
          impressions_lower_bound: item.impressions.lower_bound,
          impressions_upper_bound: item.impressions.upper_bound,
        });

        if (item.demographic_distribution) {
          for (const data of item.demographic_distribution) {
            formattedData.demographicDistributionData.push({
              advertising_id: item.id,
              age: data.age,
              gender: data.gender,
              percentage: data.percentage,
            });
          }
        }

        if (item.delivery_by_region) {
          for (const data of item.delivery_by_region) {
            formattedData.deliveryRegionData.push({
              advertising_id: item.id,
              region: data.region,
              percentage: data.percentage,
            });
          }
        }
      }
    }

    return formattedData;
  }

  async S3FacebookCommentsNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationFacebookCommentsAwsDataInterface[] =
      await axios
        .get(`${env.AWS_URL}${data.records}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw new AwsError();
        });

    const formattedData: AwsNotificationFacebookCommentsResponseInterface[] =
      [];
    for (const item of awsData) {
      if (item.text) {
        formattedData.push({
          id: item.id,
          postUrl: item.facebookUrl,
          text: item.text,
          likeCount: item.likesCount ? Number(item.likesCount) : 0,
          date: item.date,
          username: item.profileName,
          post_id: item.facebookId,
        });
      }
    }

    return formattedData;
  }

  async S3YoutubeChannelNotification(data: S3NotificationInterface) {
    const awsData: AwsNotificationYoutubeChannelAwsDataInterface[] = await axios
      .get(`${env.AWS_URL}${data.records}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw new AwsError();
      });

    const formattedData: AwsNotificationYoutubeChannelResponseInterface[] =
      awsData.map((item) => {
        return {
          id: randomUUID(),
          channel_name: item.channelName,
          channel_total_views: parseFloat(
            typeof item.channelTotalViews === "string"
              ? item.channelTotalViews.replace(",", "")
              : item.channelTotalViews
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
