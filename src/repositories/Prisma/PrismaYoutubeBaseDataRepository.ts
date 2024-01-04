import { YoutubeBaseDataCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { YoutubeBaseDataRepository } from "../YoutubeBaseDataRepository";

export class PrismaYoutubeBaseDataRepository
	implements YoutubeBaseDataRepository
{
	async createMany(data: YoutubeBaseDataCreateInterface[]) {
		await prisma.youtubeBaseData.createMany({
			data: data,
		});
	}
}
