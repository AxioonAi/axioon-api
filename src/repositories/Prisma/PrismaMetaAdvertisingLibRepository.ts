import { MetaAdvertisingLibCreateInterface } from "@/@types/databaseInterfaces";
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

		const createData: MetaAdvertisingLibCreateInterface[] = [];
		const updateData: MetaAdvertisingLibCreateInterface[] = [];

		data.forEach((item) => {
			if (!metaExists.find((meta) => meta.id === item.id)) {
				createData.push(item);
			} else {
				updateData.push(item);
			}
		});

		await prisma.$transaction([
			prisma.metaAdvertisingLib.createMany({ data: createData }),
			...updateData.map((update) =>
				prisma.metaAdvertisingLib.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);
	}
}
