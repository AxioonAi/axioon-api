import { FacebookPostCommentsCreateInterface } from "@/@types/databaseInterfaces";

export interface FacebookPostCommentsRepository {
	createMany(data: FacebookPostCommentsCreateInterface[]): Promise<void>;
	commentExists(ids: string[]): Promise<string[]>;
}
