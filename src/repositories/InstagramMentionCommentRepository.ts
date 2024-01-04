import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";

export interface InstagramMentionCommentRepository {
	createMany(data: InstagramCommentCreateInterface[]): Promise<void>;
}
