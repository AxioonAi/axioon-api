import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { SexType } from "@prisma/client";
import { InstagramPostCommentRepository } from "../InstagramPostCommentRepository";

interface CreateCommentProps extends InstagramCommentCreateInterface {
	politician_id: string;
	authorGender: SexType;
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
		const updateData: CreateCommentProps[] = [];

		for (const item of data) {
			if (!commentExists.find((comment) => comment.id === item.id)) {
				const post = postExists.find(
					(post) =>
						post.postUrl === `https://www.instagram.com/p/${item.post_id}`,
				);
				if (post && item.text && !Number.isNaN(item.sentimentAnalysis)) {
					createData.push({
						...item,
						post_id: post.id,
						authorGender: item.authorGender === "MALE" ? SexType.MALE : item.authorGender === "FEMALE" ? SexType.FEMALE : SexType.UNKNOWN, 
						sentimentAnalysis: !Number.isNaN(item.sentimentAnalysis) ? Number(item.sentimentAnalysis) : 0,
						politician_id: post.politician_id,
					});
				} else {
				}
			} else {
				const post = postExists.find(
					(post) =>
						post.postUrl === `https://www.instagram.com/p/${item.post_id}`,
				);
				if (post && item.text && item.sentimentAnalysis) {
					updateData.push({
						...item,
						politician_id: post.politician_id,
						authorGender: item.authorGender === "MALE" ? SexType.MALE : item.authorGender === "FEMALE" ? SexType.FEMALE : SexType.UNKNOWN, 
						sentimentAnalysis: Number(item.sentimentAnalysis),
						post_id: post.id,
					});
				}
			}
		}


		await prisma.$transaction([
			prisma.instagramPostComment.createMany({ data: createData.filter((item) => !Number.isNaN(item.sentimentAnalysis)) }),
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
