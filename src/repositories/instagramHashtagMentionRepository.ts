import { InstagramHashtagMentionCreateInterface } from "@/@types/databaseInterfaces";

export interface InstagramHashtagMentionRepository {
  createMany(data: InstagramHashtagMentionCreateInterface[]): Promise<void>;
  mentionExists(data: string[]): Promise<string[]>;
  mentionExistsByUrls(data: string[]): Promise<string[]>;
}
