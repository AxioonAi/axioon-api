import { AwsNotificationTiktokEngagerResponseInterface } from "@/@types/awsNotificationInterfaces";
import { TiktokEngager } from "@prisma/client";

export interface TiktokEngagerRepository {
  createMany(data: { username: string }[]): Promise<TiktokEngager[]>;
  updateMany(
    data: AwsNotificationTiktokEngagerResponseInterface[]
  ): Promise<void>;
  findScrapeProfiles(): Promise<TiktokEngager[]>;
}
