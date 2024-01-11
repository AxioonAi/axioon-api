import { prisma } from "@/lib/prisma";
import { LegalDataRepository } from "../LegalDataRepository";

export class PrismaLegalDataRepository implements LegalDataRepository {
	async createMany(
		data: {
			politician_id: string;
			subject: string | null;
			judgingBy: string | null;
			causeValue: string | null;
			court: string | null;
			url: string | null;
			id: string;
			activePole: string;
			passivePole: string;
			startDate: Date;
			lastUpdate: Date;
		}[],
	) {
		const idExists = data.map((legalData) => legalData.id);

		const exists = await prisma.legalData.findMany({
			where: {
				id: {
					in: idExists,
				},
			},
		});

		const createData = [];
		const updateData = [];

		for (const legalData of data) {
			if (exists.find((item) => item.id === legalData.id)) {
				updateData.push(legalData);
			} else {
				createData.push(legalData);
			}
		}

		await prisma.$transaction([
			prisma.legalData.createMany({
				data: createData,
			}),
			...updateData.map((update) =>
				prisma.legalData.update({ where: { id: update.id }, data: update }),
			),
		]);

		return;
	}
}
