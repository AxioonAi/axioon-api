import { prisma } from "@/lib/prisma";
import { WebsiteCityRepository } from "../WebsiteCityRepository";

export class PrismaWebsiteCityRepository implements WebsiteCityRepository {
  async findWebSiteUsers(websiteId: string) {
    return await prisma.websiteCity.findMany({
      where: {
        website_id: websiteId,
      },
      include: {
        city: {
          select: {
            users: {
              select: {
                id: true,
                social_name: true,
              },
            },
          },
        },
      },
    });
  }
}
