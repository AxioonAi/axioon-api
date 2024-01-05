import { InstagramMentionCreateInterface } from "@/@types/databaseInterfaces";

export interface InstagramMentionRepository {
	createMany(data: InstagramMentionCreateInterface[]): Promise<void>;
	mentionExists(data: string[]): Promise<string[]>;
}
