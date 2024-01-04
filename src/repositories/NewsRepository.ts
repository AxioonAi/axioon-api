import { NewsScore } from "@prisma/client";

export interface CreateNewsInterface {
	title: string;
	last_update: string;
	url: string;
	score: NewsScore;
	users: {
		user_id: string;
	}[];
}

export interface NewsRepository {
	createMany(data: CreateNewsInterface[]): Promise<void>;
}
