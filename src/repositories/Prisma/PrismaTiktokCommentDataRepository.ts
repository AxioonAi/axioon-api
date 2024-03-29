import { TiktokCommentsCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";

interface CreateCommentProps extends TiktokCommentsCreateInterface {
	politician_id: string;
}
export class PrismaTiktokCommentDataRepository {
	async createMany(data: TiktokCommentsCreateInterface[]) {
		const videoId = data.map((item) => item.video_id);
		const idExists = data.map((item) => item.id);

		const [videoExists, commentExists] = await Promise.all([
			prisma.tiktokVideoData.findMany({
				where: {
					id: {
						in: videoId,
					},
				},
			}),
			prisma.tiktokCommentData.findMany({
				where: {
					id: {
						in: idExists,
					},
				},
			}),
		]);

		const createData: CreateCommentProps[] = [];
		const updateData: TiktokCommentsCreateInterface[] = [];

		for (const item of data) {
			if (!commentExists.find((comment) => comment.id === item.id)) {
				const video = videoExists.find((video) => video.id === item.video_id);
				if (video) {
					createData.push({
						...item,
						politician_id: video.politician_id,
						sentimentAnalysis: Number(item.sentimentAnalysis),
					});
				} else {
				}
			} else {
				updateData.push(item);
			}
		}

		await prisma.$transaction([
			prisma.tiktokCommentData.createMany({ data: createData.filter((item) => !Number.isNaN(item.sentimentAnalysis))  }),
			...updateData.map((update) =>
				prisma.tiktokCommentData.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);

		return;
	}

	async commentExists(ids: string[]) {
		const comments = await prisma.tiktokCommentData.findMany({
			where: {
				id: {
					in: ids,
				},
			},
			select: {
				id: true,
			},
		});

		return comments.map((item) => item.id);
	}
}
