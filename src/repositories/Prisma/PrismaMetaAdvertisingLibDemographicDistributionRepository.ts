import { prisma } from "@/lib/prisma";
import { MetaAdvertisingLibDemographicDistributionRepository } from "../MetaAdvertisingLibDemographicDistributionRepository";

export class PrismaMetaAdvertisingLibDemographicDistributionRepository
  implements MetaAdvertisingLibDemographicDistributionRepository
{
  async createMany(data: any[]) {
    const advertisingIds = data.map((item) => item.advertising_id);
    const ages = data.map((item) => item.age);
    const gender = data.map((item) => item.gender);
    const percentage = data.map((item) => item.percentage);

    const exists =
      await prisma.metaAdvertisingLibDemographicDistribution.findMany({
        where: {
          AND: [
            { advertising_id: { in: advertisingIds } },
            { age: { in: ages } },
            { gender: { in: gender } },
            { percentage: { in: percentage } },
          ],
        },
      });

    const createData: any = [];
    const updateData: any = [];

    data.forEach((item) => {
      if (
        !exists.find(
          (meta) =>
            meta.age === item.age &&
            meta.gender === item.gender &&
            meta.percentage === item.percentage &&
            meta.advertising_id === item.advertising_id
        )
      ) {
        createData.push(item);
      } else {
        const exist = exists.find(
          (meta) =>
            meta.age === item.age &&
            meta.gender === item.gender &&
            meta.percentage === item.percentage &&
            meta.advertising_id === item.advertising_id
        );

        if (exist) {
          updateData.push({
            id: exist.id,
            ...item,
          });
        }
      }
    });

    await prisma.$transaction([
      prisma.metaAdvertisingLibDemographicDistribution.createMany({
        data: createData,
      }),
      ...updateData.map((update: any) =>
        prisma.metaAdvertisingLibDemographicDistribution.update({
          where: {
            id: update.id,
          },
          data: update,
        })
      ),
    ]);
  }
}
