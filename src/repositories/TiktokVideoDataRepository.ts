import { TiktokVideoCreateInterface } from "@/@types/databaseInterfaces";

export interface TiktokVideoDataRepository {
	createMany(data: TiktokVideoCreateInterface[]): Promise<void>;
	videoExists(data: string[]): Promise<string[]>;
}
