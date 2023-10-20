import { PrismaWebsiteCityRepository } from "@/repositories/Prisma/PrismaWebsiteCityRepository";
import { FindWebsiteUserListUseCase } from "@/useCase/user/FindWebsiteUserList";

export function makeUserWebsiteList() {
  const websiteCityRepository = new PrismaWebsiteCityRepository();
  return new FindWebsiteUserListUseCase(websiteCityRepository);
}
