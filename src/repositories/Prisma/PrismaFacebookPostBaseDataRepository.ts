import { FacebookPostCreateInterface } from "@/@types/databaseInterfaces";
import { prisma } from "@/lib/prisma";
import { FacebookPostBaseDataRepository } from "../FacebookPostBaseDataRepository";

export class PrismaFacebookPostBaseDataRepository
	implements FacebookPostBaseDataRepository
{
	async createMany(data: FacebookPostCreateInterface[]) {
		const idExists = data.map((item) => item.id);
		const postExists = await prisma.facebookPostBaseData.findMany({
			where: {
				id: {
					in: idExists,
				},
			},
		});

		const createPostData: FacebookPostCreateInterface[] = [];
		const updatePostData: FacebookPostCreateInterface[] = [];

		for (const item of data) {
			if (!postExists.find((post) => post.id === item.id)) {
				createPostData.push(item);
			} else {
				updatePostData.push(item);
			}
		}

		await prisma.$transaction([
			prisma.facebookPostBaseData.createMany({ data: createPostData }),
			...updatePostData.map((update) =>
				prisma.facebookPostBaseData.update({
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
