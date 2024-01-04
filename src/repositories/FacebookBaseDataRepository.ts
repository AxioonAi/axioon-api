import { FacebookBaseDataCreateInterface } from "@/@types/databaseInterfaces";

export interface FacebookBaseDataRepository {
	createMany(data: FacebookBaseDataCreateInterface[]): Promise<void>;
}
