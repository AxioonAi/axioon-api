import { YoutubeVideoCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { YoutubeVideoDataRepository } from "../YoutubeVideoDataRepository";

export class PrismaYoutubeVideoDataRepository
	implements YoutubeVideoDataRepository
{
	async createMany(data: YoutubeVideoCreateInterface[]) {
		const idExists = data.map((item) => item.id);

		const videoExists = await prisma.youtubeVideoData.findMany({
			where: {
				id: {
					in: idExists,
				},
			},
		});

		const createVideoData: YoutubeVideoCreateInterface[] = [];
		const updateVideoData: YoutubeVideoCreateInterface[] = [];

		data.forEach((item) => {
			if (!videoExists.find((video) => video.id === item.id)) {
				createVideoData.push(item);
			} else {
				updateVideoData.push(item);
			}
		});

		await prisma.$transaction([
			prisma.youtubeVideoData.createMany({ data: createVideoData }),
			...updateVideoData.map((update: YoutubeVideoCreateInterface) =>
				prisma.youtubeVideoData.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);

		return;
	}
}
