import { InstagramPostCreateInterface } from "@/@types/databaseInterfaces";

export interface InstagramPostRepository {
  createMany(data: InstagramPostCreateInterface[]): Promise<void>;
}
