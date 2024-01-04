import { City, Prisma } from "@prisma/client";

export interface CityRepository {
	findByNameAndState(name: string, state: string): Promise<City | null>;
	findById(id: string): Promise<City | null>;
	create(data: Prisma.CityCreateInput): Promise<City>;
}
