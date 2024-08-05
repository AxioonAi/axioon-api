import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";

export interface InstagramHashtagMentionCommentRepository {
  createMany(data: InstagramCommentCreateInterface[]): Promise<void>;
  commentExists(data: string[]): Promise<string[]>;
}
