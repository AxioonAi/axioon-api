import { AwsNotificationInstagramEngagerResponseInterface } from "@/@types/awsNotificationInterfaces";
import { InstagramEngager } from "@prisma/client";

export interface InstagramEngagerRepository {
  createMany(data: { username: string }[]): Promise<InstagramEngager[]>;
  updateMany(
    data: AwsNotificationInstagramEngagerResponseInterface[]
  ): Promise<void>;
  findScrapeProfiles(): Promise<InstagramEngager[]>;
}
