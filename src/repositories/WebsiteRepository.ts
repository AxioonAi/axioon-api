import { Prisma, Website } from "@prisma/client";

export interface WebSiteRepository {
  findById(id: string): Promise<Website>;
  create(data: Prisma.WebsiteCreateInput): Promise<Website>;
}
