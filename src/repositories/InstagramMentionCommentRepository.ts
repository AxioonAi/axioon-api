import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";

export interface InstagramMentionCommentRepository {
	createMany(data: InstagramCommentCreateInterface[]): Promise<void>;
	commentExists(data: string[]): Promise<string[]>;
}
