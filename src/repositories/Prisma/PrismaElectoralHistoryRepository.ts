import { prisma } from "@/lib/prisma";
import {
  CreateElectoralHistory,
  ElectoralHistoryRepository,
} from "../electoralHistoryRepository";

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

  async create(data: CreateElectoralHistory) {
    await prisma.electoralHistory.createMany({
      data: data.electoralHistoryData,
    });

    await Promise.all([
      prisma.electoralHistoryDetailedExpensesList.createMany({
        data: data.detailedExpensesListData,
      }),
      prisma.electoralHistoryDetailedRevenuesList.createMany({
        data: data.detailedRevenuesListData,
      }),
      prisma.electoralHistoryAsset.createMany({
        data: data.electoralAssetsData,
      }),
      prisma.electoralHistoryDonorsRanking.createMany({
        data: data.donorsRankingData,
      }),
      prisma.electoralHistoryDetailedExpensesList.createMany({
        data: data.detailedExpensesListData,
      }),
      prisma.electoralHistoryConsolidatedExpensesValues.createMany({
        data: data.electoralExpensesValueData,
      }),
      prisma.electoralHistoryProvidersRanking.createMany({
        data: data.providersRankingData,
      }),
      prisma.electoralHistoryRepresentatives.createMany({
        data: data.representativesData,
      }),
      prisma.electoralHistoryConsolidatedRevenueValues.createMany({
        data: data.electoralHistoryRevenueValueData,
      }),
    ]);
  }
}
