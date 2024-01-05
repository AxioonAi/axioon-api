import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { InstagramPostCommentRepository } from "../InstagramPostCommentRepository";

interface CreateCommentProps extends InstagramCommentCreateInterface {
	politician_id: string;
	sentimentAnalysis: number;
}

export class PrismaInstagramCommentRepository
	implements InstagramPostCommentRepository
{
	async createMany(data: InstagramCommentCreateInterface[]) {
		const idExists = data.map((item) => item.id);
		const postId = data.map((item) => {
			return `https://www.instagram.com/p/${item.post_id}`;
		});

		const [postExists, commentExists] = await Promise.all([
			prisma.instagramPost.findMany({
				where: {
					postUrl: {
						in: postId,
					},
				},
			}),
			prisma.instagramPostComment.findMany({
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
				if (post && item.text) {
					console.log("entrou criar comment");
					createData.push({
						...item,
						post_id: post.id,
						sentimentAnalysis: Number(item.sentimentAnalysis),
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

		console.log(createData.length);

		await prisma.$transaction([
			prisma.instagramPostComment.createMany({ data: createData }),
			...updateData.map((update) =>
				prisma.instagramPostComment.update({
					where: {
						id: update.id,
					},
					data: update,
				}),
			),
		]);
		return;
	}

	async commentExists(data: string[]) {
		const comments = await prisma.instagramPostComment.findMany({
			where: {
				id: {
					in: data,
				},
			},
			select: {
				id: true,
			},
		});

		return comments.map((item) => item.id);
	}
}
