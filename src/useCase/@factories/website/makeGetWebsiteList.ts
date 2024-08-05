import { PrismaWebsiteRepository } from "@/repositories/Prisma/PrismaWebsiteRepository";
import { GetWebsiteListUseCase } from "@/useCase/website/GetWebsiteList";

export function makeGetWebsiteList() {
  const websiteRepository = new PrismaWebsiteRepository();
  return new GetWebsiteListUseCase(websiteRepository);
}
