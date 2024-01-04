import { MetaAdvertisingLibDeliveryByRegionCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { MetaAdvertisingLibDeliveryByRegionRepository } from "../MetaAdvertisingLibDeliveryByRegionRepository";

interface UpdateDataProps
	extends MetaAdvertisingLibDeliveryByRegionCreateInterface {
	id: string;
}

export class PrismaMetaAdvertisingLibDeliveryByRegionRepository
	implements MetaAdvertisingLibDeliveryByRegionRepository
{
	async createMany(data: MetaAdvertisingLibDeliveryByRegionCreateInterface[]) {
		const advertisingIds = data.map((item) => item.advertising_id);
		const regions = data.map((item) => item.region);

		const exists = await prisma.metaAdvertisingLibDeliveryByRegion.findMany({
			where: {
				AND: [
					{ advertising_id: { in: advertisingIds } },
					{ region: { in: regions } },
				],
			},
		});

		const createData: MetaAdvertisingLibDeliveryByRegionCreateInterface[] = [];
		const updateData: UpdateDataProps[] = [];

		data.forEach((item) => {
			if (
				!exists.find(
					(meta) =>
						meta.region === item.region &&
						meta.advertising_id === item.advertising_id,
				)
			) {
				createData.push(item);
			} else {
				const exist = exists.find(
					(meta) =>
						meta.region === item.region &&
						meta.advertising_id === item.advertising_id,
				);

				if (exist) {
					updateData.push({
						id: exist.id,
						...item,
					});
				}
			}
		});

		console.log(updateData.length);

		await prisma.$transaction([
			prisma.metaAdvertisingLibDeliveryByRegion.createMany({
				data: createData,
			}),
			...updateData.map((update) =>
				prisma.metaAdvertisingLibDeliveryByRegion.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);
	}
}
