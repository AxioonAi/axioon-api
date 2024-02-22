import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { InstagramMentionCommentRepository } from "../InstagramMentionCommentRepository";

interface CreateCommentProps extends InstagramCommentCreateInterface {
	politician_id: string;
	sentimentAnalysis: number;
}

export class PrismaInstagramMentionCommentRepository
	implements InstagramMentionCommentRepository
{
	async createMany(data: InstagramCommentCreateInterface[]) {
		const idExists = data.map((item) => item.id);
		const postId = data.map((item) => {
			return `https://www.instagram.com/p/${item.post_id}`;
		});

		const [postExists, commentExists] = await Promise.all([
			prisma.instagramMention.findMany({
				where: {
					postUrl: {
						in: postId,
					},
				},
			}),
			prisma.instagramMentionComment.findMany({
				where: {
					id: {
						in: idExists,
					},
				},
			}),
		]);

		const createData: CreateCommentProps[] = [];
		const updateData: InstagramCommentCreateInterface[] = [];

		for (const item of data) {
			if (!commentExists.find((comment) => comment.id === item.id)) {
				const post = postExists.find(
					(post) =>
						post.postUrl === `https://www.instagram.com/p/${item.post_id}`,
				);
				if (post && item.text && item.sentimentAnalysis && !Number.isNaN(item.sentimentAnalysis)) {
					createData.push({
						...item,
						post_id: post.id,
						sentimentAnalysis:!Number.isNaN(item.sentimentAnalysis) ? Number(item.sentimentAnalysis) : 0,
						politician_id: post.politician_id,
					});
				} else {
				}
			} else {
				const post = postExists.find(
					(post) =>
						post.postUrl === `https://www.instagram.com/p/${item.post_id}`,
				);
				if (post) {
					updateData.push({
						...item,
						post_id: post.id,
					});
				}
			}
		}

		await prisma.$transaction([
			prisma.instagramMentionComment.createMany({ data: createData.filter((item) => !Number.isNaN(item.sentimentAnalysis))  }),
			...updateData.map((update) =>
				prisma.instagramMentionComment.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);
	}

	async commentExists(ids: string[]) {
		const comments = await prisma.instagramMentionComment.findMany({
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
