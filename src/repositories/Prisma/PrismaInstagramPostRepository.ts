import { InstagramPostCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { InstagramPostRepository } from "../InstagramPostRepository";

export class PrismaInstagramPostRepository implements InstagramPostRepository {
	async createMany(
		data: {
			id: string;
			postUrl: string;
			description: string;
			commentCount: number;
			likeCount: number;
			pubDate: Date;
			viewCount: number;
			username: string;
			imgUrl: string;
			postId: string;
			politician_id: string;
			playCount: number;
		}[],
	) {
		const idExits = await prisma.instagramPost.findMany({
			where: {
				id: {
					in: data.map((d) => d.id),
				},
			},
		});

		const createData: InstagramPostCreateInterface[] = [];
		const updateData: InstagramPostCreateInterface[] = [];

		for (const item of data) {
			if (!idExits.find((d) => d.id === item.id)) {
				createData.push({
					...item,
					playCount: item.playCount ? item.playCount : 0,
				});
			} else {
				updateData.push({
					...item,
					playCount: item.playCount ? item.playCount : 0,
				});
			}
		}

		await prisma.$transaction([
			prisma.instagramPost.createMany({ data: createData }),
			...updateData.map((update: InstagramPostCreateInterface) =>
				prisma.instagramPost.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);

		return;
	}

	async existsByUrl(url: string[]) {
		const formattedUrl = url.map((item) => {
			return `https://www.instagram.com/p/${item}`;
		});

		const exists = await prisma.instagramPost.findMany({
			where: {
				postUrl: {
					in: formattedUrl,
				},
			},
		});

		return exists.map((item) =>
			item.postUrl.replace("https://www.instagram.com/p/", ""),
		);
	}
}
