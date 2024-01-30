import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { CreateNewsInterface, NewsRepository } from "../NewsRepository";

interface CreateNewsProps {
	id: string;
	title: string;
	url: string;
	last_update: Date;
}

export class PrismaNewsRepository implements NewsRepository {
	async createMany(data: CreateNewsInterface[]) {
		const createUserData: {
			news_id: string;
			politician_id: string;
			sentimentAnalysis: number;
		}[] = [];

		const urlExists = data.map((item) => item.url);

		const exists = await prisma.news.findMany({
			where: {
				url: {
					in: urlExists,
				},
			},
		});

		const createData: CreateNewsProps[] = [];
		const updateData: CreateNewsProps[] = [];

		for (const item of data) {
			if (!exists.find((news) => news.url === item.url)) {
				const { users, ...rest } = item;
				const id = randomUUID();
				createUserData.push(
					...users.map((user) => ({
						politician_id: user.politician_id,
						sentimentAnalysis: Number(user.sentimentAnalysis),
						news_id: id,
					})),
				);
				createData.push({
					...rest,
					id,
				});
			} else {
				const exist = exists.find((news) => news.url === item.url);
				if (exist) {
					updateData.push({
						id: exist.id,
						...item,
					});
				}
			}
		}

		await prisma.news.createMany({
			data: createData,
		});

		await prisma.newsUsers.createMany({
			data: createUserData,
		});

		return;
	}

	async newsExists(urls: string[]) {
		const news = await prisma.news.findMany({
			where: {
				url: {
					in: urls,
				},
			},
		});

		return news.map((item) => item.url);
	}
}
