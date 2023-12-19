import { YoutubeVideoCreateInterface } from "@/@types/databaseInterfaces";

export interface YoutubeVideoDataRepository {
  createMany(data: YoutubeVideoCreateInterface[]): Promise<void>;
}
