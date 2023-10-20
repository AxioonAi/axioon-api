import { InstagramPost, Prisma } from "@prisma/client";

export interface InstagramPostRepository {
  findById(id: string): Promise<InstagramPost>;
  create(data: Prisma.InstagramPostCreateInput): Promise<InstagramPost>;
  findByUserId(id: string): Promise<InstagramPost[]>;
}
