import { prisma } from "@/lib/prisma";
import { PoliticianProfileMonitoringRepository } from "../PoliticianProfileMonitoringRepository";
import { Status } from "@prisma/client";
import moment from "moment";

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
        politicianProfile: {
          status: Status.ACTIVE,
        },
      },
      include: {
        politicianProfile: {
          include: {
            politicalGroup: true,
            instagramData: {
              select: {
                profilePicture: true,
              },
              orderBy: {
                date: "desc",
              },
            },
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

            instagramData: {
              select: {
                profilePicture: true,
              },
              orderBy: {
                date: "desc",
              },
            },
          },
        },
      },
    });
  }

  async findManyByUserIdWithPosts(userId: string) {
    console.log("entrou");
    return await prisma.politicianProfileMonitoring.findMany({
      where: {
        user_id: userId,
        politicianProfile: {
          status: Status.ACTIVE,
        },
      },
      include: {
        politicianProfile: {
          include: {
            facebookPosts: {
              where: {
                date: {
                  gte: moment().subtract(30, "days").toDate(),
                },
              },
            },
            instagramPosts: {
              where: {
                pubDate: {
                  gte: moment().subtract(30, "days").toDate(),
                },
              },
            },
            tiktokVideoData: {
              where: {
                date: {
                  gte: moment().subtract(30, "days").toDate(),
                },
              },
            },
            youtubeVideoData: {
              where: {
                date: {
                  gte: moment().subtract(30, "days").toDate(),
                },
              },
            },
          },
        },
      },
    });
  }
}
