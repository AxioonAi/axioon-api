import { PrismaTiktokEngagerRepository } from "@/repositories/Prisma/PrismaTiktokEngagerRepository";
import { FindTiktokEngagersDataUseCase } from "@/useCase/scrape/findTiktokEngagerData";

export function makeFindTiktokEngagers() {
  const tiktokEngagersRepository = new PrismaTiktokEngagerRepository();

  return new FindTiktokEngagersDataUseCase(tiktokEngagersRepository);
}
