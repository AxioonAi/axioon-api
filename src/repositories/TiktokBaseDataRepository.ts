import { TiktokBaseDataCreateInterface } from "@/@types/databaseInterfaces";

export interface TiktokBaseDataRepository {
  createMany(data: TiktokBaseDataCreateInterface[]): Promise<void>;
}
