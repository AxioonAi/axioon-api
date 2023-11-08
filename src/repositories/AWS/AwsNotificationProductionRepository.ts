import axios from "axios";
import moment from "moment";
import {
  AwsNotificationRepository,
  S3NotificationInterface,
} from "../AwsNotificationRepository";

export class AwsNotificationProductionRepository
  implements AwsNotificationRepository
{
  async S3NewsNotification(data: S3NotificationInterface) {
    const response = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const format = response.map((item: any) => {
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
    const response = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    return response;
  }

  async S3YoutubeNotification(data: S3NotificationInterface) {
    const response = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const dateFilter = response.filter((item: any) => {
      // return item.date.includes("day");
      return item;
    });

    const formattedDate: any = {};

    for (const key in dateFilter) {
      if (!formattedDate[dateFilter[key].channel_id]) {
        formattedDate[dateFilter[key].channel_id] = {
          videos: [],
          channelData: {
            channelName: dateFilter[key].channelName,
            channelUrl: dateFilter[key].channelUrl,
            channelDescription: dateFilter[key].channelDescription,
            channelTotalVideos: dateFilter[key].channelTotalVideos,
            channelTotalViews: dateFilter[key].channelTotalViews,
            channelTotalSubscribers: dateFilter[key].channelTotalSubscribers,
            date: moment(dateFilter[key].date.replace("~", "")).toDate(),
          },
        };
      }
      formattedDate[dateFilter[key].channel_id] = {
        videos: [
          ...formattedDate[dateFilter[key].channel_id].videos,
          {
            title: dateFilter[key].title,
            url: dateFilter[key].url,
            duration: dateFilter[key].duration,
            viewCount: dateFilter[key].viewCount,
            commentsCount: dateFilter[key].commentsCount,
            likes: dateFilter[key].likes,
            date: moment(dateFilter[key].date.replace("~", "")).toDate(),
            description: dateFilter[key].text,
            imgUrl: dateFilter[key].thumbnailUrl,
          },
        ],
        channelData: {
          channelName: dateFilter[key].channelName,
          channelTotalVideos: dateFilter[key].channelTotalVideos,
          channelTotalSubscribers: dateFilter[key].numberOfSubscribers,
          date: moment(dateFilter[key].date.replace("~", "")).toDate(),
        },
      };
    }

    const arrayDeObjetos = [];

    for (const chave in formattedDate) {
      if (formattedDate.hasOwnProperty(chave)) {
        arrayDeObjetos.push({
          id: chave,
          videos: formattedDate[chave].videos,
          channelData: formattedDate[chave].channelData,
        });
      }
    }

    return arrayDeObjetos;
  }
  async S3FacebookNotification(data: S3NotificationInterface) {
    const response = await axios
      .get(
        `https://nightapp.s3.sa-east-1.amazonaws.com/${data.records[0].s3.object.key}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const formattedData: any[] = [];

    response.forEach((item: any) => {
      formattedData.push({
        user_id: item.facebook_id,
        likes_count: item.likes,
        followers_count: item.followers,
        start_of_period: moment().clone().weekday(1).toDate(),
        end_of_period: moment().clone().weekday(5).toDate(),
      });
    });

    return formattedData;
  }
}
