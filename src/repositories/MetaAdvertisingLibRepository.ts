import { MetaAdvertisingLib } from "@prisma/client";

export interface MetaAdvertisingLibCreateManyInterface
  extends MetaAdvertisingLib {}

export interface MetaAdvertisingLibRepository {
  createMany(data: MetaAdvertisingLib[]): Promise<void>;
  findDetails(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any>;
}
