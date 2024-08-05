import { prisma } from "@/lib/prisma";
import { ElectoralHistoryRepository } from "../electoralHistoryRepository";

export class PrismaElectoralHistoryRepository
  implements ElectoralHistoryRepository
{
  async getDetailsById(id: string) {
    return await prisma.electoralHistory.findUnique({
      where: {
        id,
      },
      include: {
        detailedExpensesList: true,
        detailedRevenuesList: true,
        assets: true,
        donorsRanking: true,
        expensesList: true,
        expensesValues: true,
        providersRanking: true,
        representatives: true,
        revenueValues: true,
      },
    });
  }

  async getProfileYears(id: string) {
    return await prisma.electoralHistory.findMany({
      where: {
        politician_profile_id: id,
      },
      select: {
        id: true,
        election_year: true,
      },
    });
  }
}
