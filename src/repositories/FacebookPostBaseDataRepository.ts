import { FacebookPostCreateInterface } from "@/@types/databaseInterfaces";

export interface FacebookPostBaseDataRepository {
  createMany(data: FacebookPostCreateInterface[]): Promise<void>;
}
