import axios from "axios";
import moment from "moment";
import {
  AwsNotificationRepository,
  S3NewsNotificationInterface,
} from "../AwsNotificationRepository";

export class AwsNotificationProductionRepository
  implements AwsNotificationRepository
{
  async S3NewsNotification(data: S3NewsNotificationInterface) {
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
}
