import { prisma } from "@/lib/prisma";
import { PoliticianProfileMonitoringRepository } from "../PoliticianProfileMonitoringRepository";

export class PrismaPoliticianProfileMonitoringRepository
  implements PoliticianProfileMonitoringRepository
{
  async create(data: { politician_profile_id: string; user_id: string }) {
    await prisma.politicianProfileMonitoring.create({
      data,
    });
  }
}
