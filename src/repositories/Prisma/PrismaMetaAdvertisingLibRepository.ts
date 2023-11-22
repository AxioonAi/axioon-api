import { prisma } from "@/lib/prisma";
import { MetaAdvertisingLib } from "@prisma/client";
import { MetaAdvertisingLibRepository } from "../MetaAdvertisingLibRepository";

export class PrismaMetaAdvertisingLibRepository
  implements MetaAdvertisingLibRepository
{
  async createMany(data: MetaAdvertisingLib[]) {
    const idExists = data.map((item) => item.id);

    const metaExists = await prisma.metaAdvertisingLib.findMany({
      where: {
        id: {
          in: idExists,
        },
      },
    });

    const createData: any = [];
    const updateData: any = [];

    data.forEach((item) => {
      if (!metaExists.find((meta) => meta.id === item.id)) {
        createData.push(item);
      } else {
        updateData.push(item);
      }
    });

    await prisma.$transaction([
      prisma.metaAdvertisingLib.createMany({ data: createData }),
      ...updateData.map((update: any) =>
        prisma.metaAdvertisingLib.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);
  }

  async findDetails(data: { id: string; startDate: Date; endDate: Date }) {
    const meta = await prisma.metaAdvertisingLib.findMany({
      where: {
        politician_id: data.id,
        ad_creation_time: {
          gte: data.startDate,
          lte: data.endDate,
        },
      },
      include: {
        deliveryByRegion: true,
        demographicDistribution: true,
      },
    });

    return meta;
  }
}
