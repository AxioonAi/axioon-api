import { FacebookPostCreateInterface } from "@/@types/databaseInterfaces";

export interface FacebookPostBaseDataRepository {
  createMany(data: FacebookPostCreateInterface[]): Promise<void>;
  findDetails(data: { id: string; period: number }): Promise<any>;
  findStatistics(data: { id: string; period: number }): Promise<any>;
  findHomeData(data: { id: string; period: number }): Promise<any>;
}
