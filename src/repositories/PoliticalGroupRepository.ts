import { PoliticalGroup } from "@prisma/client";

export interface PoliticalGroupRepository {
	findById(id: string): Promise<PoliticalGroup | null>;
	findMany(): Promise<PoliticalGroup[]>;
}
