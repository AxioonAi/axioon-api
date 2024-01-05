import { TiktokVideoCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { TiktokVideoDataRepository } from "../TiktokVideoDataRepository";

export class PrismaTiktokVideoDataRepository
	implements TiktokVideoDataRepository
{
	async createMany(data: TiktokVideoCreateInterface[]) {
		const idExists = data.map((item) => item.id);

		const videoExists = await prisma.tiktokVideoData.findMany({
			where: {
				id: {
					in: idExists,
				},
			},
		});

		const createVideoData: TiktokVideoCreateInterface[] = [];
		const updateVideoData: TiktokVideoCreateInterface[] = [];

		for (const item of data) {
			if (!videoExists.find((video) => video.id === item.id)) {
				createVideoData.push(item);
			} else {
				updateVideoData.push(item);
			}
		}

		await prisma.$transaction([
			prisma.tiktokVideoData.createMany({ data: createVideoData }),
			...updateVideoData.map((update) =>
				prisma.tiktokVideoData.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);

		return;
	}

	async videoExists(ids: string[]) {
		const videoExists = await prisma.tiktokVideoData.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});

		return videoExists.map((item) => item.id);
	}
}
