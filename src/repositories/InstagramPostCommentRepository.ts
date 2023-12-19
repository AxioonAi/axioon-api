import { InstagramCommentCreateInterface } from "@/@types/databaseInterfaces";

export interface InstagramPostCommentRepository {
  createMany(data: InstagramCommentCreateInterface[]): Promise<void>;
}
