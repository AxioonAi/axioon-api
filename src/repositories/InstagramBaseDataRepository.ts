import { InstagramBaseDataCreateInterface } from "@/@types/databaseInterfaces";

export interface InstagramBaseDataRepository {
  createMany(data: InstagramBaseDataCreateInterface[]): Promise<void>;
}
