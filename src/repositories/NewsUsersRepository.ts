import { News } from "@prisma/client";

export interface NewsUserRepository {
	findById(id: string): Promise<News>;
	createMany(
		data: { politician_id: string; sentimentAnalysis: string }[],
	): Promise<void>;
	findByUserId(id: string): Promise<News[]>;
}
