import { YoutubeBaseDataCreateInterface } from "@/@types/databaseInterfaces";

export interface YoutubeBaseDataRepository {
  createMany(data: YoutubeBaseDataCreateInterface[]): Promise<void>;
}
