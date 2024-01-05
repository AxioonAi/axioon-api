import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { CreateNewsInterface, NewsRepository } from "../NewsRepository";

export class PrismaNewsRepository implements NewsRepository {
	async createMany(data: CreateNewsInterface[]) {
		const createUserData: {
			news_id: string;
			politician_id: string;
			sentimentAnalysis: number;
		}[] = [];
		const createData = data.map((item) => {
			const { users, ...rest } = item;
			const id = randomUUID();
			createUserData.push(
				...users.map((user) => ({
					politician_id: user.politician_id,
					sentimentAnalysis: Number(user.sentimentAnalysis),
					news_id: id,
				})),
			);
			return {
				...rest,
				id,
			};
		});

		console.log(createUserData);

		await prisma.news.createMany({
			data: createData,
		});

		await prisma.newsUsers.createMany({
			data: createUserData,
		});

		return;
	}
}
