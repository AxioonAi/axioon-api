import { prisma } from "@/lib/prisma";
import moment from "moment";
import { FacebookBaseDataRepository } from "../FacebookBaseDataRepository";

export class PrismaFacebookBaseDataRepository
  implements FacebookBaseDataRepository
{
  async createMany(
    data: {
      politician_id: string;
      title: string;
      likes_count: number;
      followers_count: number;
      start_of_period: Date;
      end_of_period: Date;
    }[]
  ) {
    await prisma.facebookBaseData.createMany({
      data,
    });

    return;
  }

  async findDetails(data: { id: string; period: number }) {
    return await prisma.facebookBaseData.findFirst({
      where: {
        politician_id: data.id,
        start_of_period: {
          gte: moment().subtract(data.period, "days").toDate(),
          lte: moment().toDate(),
        },
      },
      orderBy: {
        end_of_period: "asc",
      },
    });
  }
}
