import { City, Prisma } from "@prisma/client";

export interface CityRepository {
  findByName(name: string): Promise<City>;
  findById(id: string): Promise<City>;
  create(data: Prisma.CityCreateInput): Promise<City>;
}
