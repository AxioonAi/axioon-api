import { TiktokCommentsCreateInterface } from "@/@types/databaseInterfaces";

export interface TiktokHashtagMentionCommentRepository {
  createMany(data: TiktokCommentsCreateInterface[]): Promise<void>;
  commentExists(data: string[]): Promise<string[]>;
}
