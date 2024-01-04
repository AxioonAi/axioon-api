import { TiktokCommentsCreateInterface } from "@/@types/databaseInterfaces";

export interface TiktokCommentDataRepository {
	createMany(data: TiktokCommentsCreateInterface[]): Promise<void>;
}
