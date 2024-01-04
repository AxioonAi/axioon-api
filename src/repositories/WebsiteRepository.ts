import { City, Website } from "@prisma/client";

interface websiteWithCity extends Website {
	city: City;
}

export interface WebSiteRepository {
	findById(id: string): Promise<websiteWithCity | null>;
}
