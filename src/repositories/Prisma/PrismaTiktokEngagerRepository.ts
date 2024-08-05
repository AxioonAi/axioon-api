import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import moment from "moment";
import { TiktokEngagerRepository } from "../TiktokEngagerRepository";
import { AwsNotificationTiktokEngagerResponseInterface } from "@/@types/awsNotificationInterfaces";

export class PrismaTiktokEngagerRepository implements TiktokEngagerRepository {
  async createMany(data: { username: string }[]) {
    const engagerExists = await prisma.tiktokEngager.findMany({
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
        name: d.username,
        fans: 0,
        heart: 0,
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    await prisma.tiktokEngager.createMany({
      data: createData,
    });

    return [...createData, ...engagerExists];
  }

  async findScrapeProfiles() {
    return prisma.tiktokEngager.findMany({
      where: {
        OR: [
          {
            fans: 0,
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

  async updateMany(data: AwsNotificationTiktokEngagerResponseInterface[]) {
    const updateData = data.map((profile) => ({
      id: profile.engagerId,
      fans: profile.fans,
      heart: profile.heart,
    }));

    await prisma.tiktokEngager.updateMany({
      data: updateData,
    });

    return;
  }
}
