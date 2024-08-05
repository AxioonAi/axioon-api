import { prisma } from "@/lib/prisma";
import { HashtagMonitoringRepository } from "../hashtagMonitoringRepository";

export class PrismaHashtagMonitoringRepository
  implements HashtagMonitoringRepository
{
  async create(data: { hashtag_id: string; user_id: string }) {
    await prisma.hashtagMonitoring.create({
      data,
    });
  }

  async findByUserIdAndHashtagId(data: {
    hashtag_id: string;
    user_id: string;
  }) {
    const hashtagMonitoring = await prisma.hashtagMonitoring.findFirst({
      where: {
        hashtag_id: data.hashtag_id,
        user_id: data.user_id,
      },
    });

    return hashtagMonitoring;
  }
}
