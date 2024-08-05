import { HashtagMonitoring } from "@prisma/client";

export interface HashtagMonitoringRepository {
  create(data: { hashtag_id: string; user_id: string }): Promise<void>;
  findByUserIdAndHashtagId(data: {
    hashtag_id: string;
    user_id: string;
  }): Promise<HashtagMonitoring | null>;
}
