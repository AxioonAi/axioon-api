import { prisma } from "@/lib/prisma";
import { PoliticianProfileMonitoringRepository } from "../PoliticianProfileMonitoringRepository";

export class PrismaPoliticianProfileMonitoringRepository
  implements PoliticianProfileMonitoringRepository
{
  async create(data: { politician_profile_id: string; user_id: string }) {
    await prisma.politicianProfileMonitoring.create({
      data,
    });
  }

  async verify(data: { profileId: string; userId: string }) {
    return await prisma.politicianProfileMonitoring.findFirst({
      where: {
        politician_profile_id: data.profileId,
        user_id: data.userId,
      },
    });
  }

  async findManyByUserId(userId: string) {
    return await prisma.politicianProfileMonitoring.findMany({
      where: {
        user_id: userId,
      },
      include: {
        politicianProfile: {
          include: {
            politicalGroup: true,
          },
        },
      },
    });
  }

  async findUsersByProfileId(ids: string[]) {
    return await prisma.politicianProfileMonitoring.findMany({
      where: {
        politician_profile_id: {
          in: ids,
        },
      },
      include: {
        politicianProfile: {
          include: {
            politicalGroup: true,
          },
        },
      },
    });
  }
}
