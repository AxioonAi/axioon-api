import { WebsiteCity } from "@prisma/client";

interface FindWebsiteUsers extends WebsiteCity {
  city: {
    users: {
      id: string;
      social_name: string;
    }[];
  };
}

export interface WebsiteCityRepository {
  findWebSiteUsers(websiteId: string): Promise<FindWebsiteUsers[]>;
}
