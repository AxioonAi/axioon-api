import { prisma } from "@/lib/prisma";
import { InstagramEngagerRepository } from "../instagramEngagerRepository";
import { randomUUID } from "crypto";
import moment from "moment";
import { AwsNotificationInstagramEngagerResponseInterface } from "@/@types/awsNotificationInterfaces";

export class PrismaInstagramEngagerRepository
  implements InstagramEngagerRepository
{
  async createMany(data: { username: string }[]) {
    const engagerExists = await prisma.instagramEngager.findMany({
      where: {
        username: {
          in: data.map((d) => d.username),
        },
      },
    });

    const createData = data
      .filter((d) => !engagerExists.find((e) => e.username === d.username))
      .map((d) => ({
        username: d.username,
        followers: 0,
        name: d.username,
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    await prisma.instagramEngager.createMany({
      data: createData,
    });

    return [...createData, ...engagerExists];
  }

  async findScrapeProfiles() {
    return prisma.instagramEngager.findMany({
      where: {
        OR: [
          {
            followers: 0,
          },
          {
            updatedAt: {
              lte: moment().subtract(30, "days").toDate(),
            },
          },
        ],
      },
    });
  }

  async updateMany(data: AwsNotificationInstagramEngagerResponseInterface[]) {
    const updateData = data.map((profile) => ({
      id: profile.engagerId,
      followers: profile.followers,
    }));

    await prisma.instagramEngager.updateMany({
      data: updateData,
    });

    return;
  }
}
