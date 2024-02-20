import { InstagramMentionCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { InstagramMentionRepository } from "../InstagramMentionRepository";

export class PrismaInstagramMentionRepository
	implements InstagramMentionRepository
{
	async createMany(data: InstagramMentionCreateInterface[]) {
		const idExists = data.map((item) => item.id);

		const mentionExists = await prisma.instagramMention.findMany({
			where: {
				id: {
					in: idExists,
				},
			},
		});

		const createData: InstagramMentionCreateInterface[] = [];
		const updateData: InstagramMentionCreateInterface[] = [];

		for (const item of data) {
			if (!mentionExists.find((mention) => mention.id === item.id)) {
				createData.push({
					...item,
					sentimentAnalysis: Number(item.sentimentAnalysis),
				});
			} else {
				updateData.push({
					...item,
					sentimentAnalysis: Number(item.sentimentAnalysis),
				});
			}
		}

		await prisma.$transaction([
			prisma.instagramMention.createMany({ data: createData }),
			...updateData.map((update) =>
				prisma.instagramMention.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);
	}

	async mentionExists(ids: string[]) {
		const mentionExists = await prisma.instagramMention.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});

		return mentionExists.map((item) => item.id);
	}

	async mentionExistsByUrls(ids: string[]) {
		const urls = ids.map((id) => {
			return `https://www.instagram.com/p/${id}`;
		});

		const mentionExists = await prisma.instagramMention.findMany({
			where: {
				postUrl: {
					in: urls,
				},
			},
		});

		return mentionExists.map((item) =>
			item.postUrl.replace("https://www.instagram.com/p/", ""),
		);
	}
}
