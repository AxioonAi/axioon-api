import { YoutubeCommentCreateInterface } from "@/@types/databaseInterfaces";

export interface YoutubeCommentsRepository {
  createMany(data: YoutubeCommentCreateInterface[]): Promise<void>;
}
