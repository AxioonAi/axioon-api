import { TiktokHashtagMentionCreateInterface } from "@/@types/databaseInterfaces";

export interface TiktokHashtagMentionRepository {
  createMany(data: TiktokHashtagMentionCreateInterface[]): Promise<void>;
  mentionExists(data: string[]): Promise<string[]>;
}
