import { Prisma } from "@prisma/client";

export interface TiktokBaseDataRepository {
  findByUserId(userId: string): Promise<any>;
  createMany(data: Prisma.TiktokBaseDataCreateManyInput): Promise<any>;
  findDetails(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any>;
}
