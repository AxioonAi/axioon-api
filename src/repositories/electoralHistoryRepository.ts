import {
  ElectoralHistory,
  ElectoralHistoryAggregatedExpensesList,
  ElectoralHistoryAsset,
  ElectoralHistoryConsolidatedExpensesValues,
  ElectoralHistoryConsolidatedRevenueValues,
  ElectoralHistoryDetailedExpensesList,
  ElectoralHistoryDetailedRevenuesList,
  ElectoralHistoryDonorsRanking,
  ElectoralHistoryProvidersRanking,
  ElectoralHistoryRepresentatives,
  Prisma,
} from "@prisma/client";

export interface ElectoralHistoryDetails extends ElectoralHistory {
  assets: ElectoralHistoryAsset[];
  revenueValues: ElectoralHistoryConsolidatedRevenueValues[];
  expensesValues: ElectoralHistoryConsolidatedExpensesValues[];
  expensesList: ElectoralHistoryAggregatedExpensesList[];
  providersRanking: ElectoralHistoryProvidersRanking[];
  donorsRanking: ElectoralHistoryDonorsRanking[];
  representatives: ElectoralHistoryRepresentatives[];
  detailedExpensesList: ElectoralHistoryDetailedExpensesList[];
  detailedRevenuesList: ElectoralHistoryDetailedRevenuesList[];
}

export interface CreateElectoralHistory {
  electoralHistoryData: Prisma.ElectoralHistoryUncheckedCreateInput[];
  electoralAssetsData: Prisma.ElectoralHistoryAssetUncheckedCreateInput[];
  electoralHistoryRevenueValueData: Prisma.ElectoralHistoryConsolidatedRevenueValuesUncheckedCreateInput[];
  electoralExpensesValueData: Prisma.ElectoralHistoryConsolidatedExpensesValuesUncheckedCreateInput[];
  electoralExpensesListData: Prisma.ElectoralHistoryAggregatedExpensesListUncheckedCreateInput[];
  providersRankingData: Prisma.ElectoralHistoryProvidersRankingUncheckedCreateInput[];
  donorsRankingData: Prisma.ElectoralHistoryDonorsRankingUncheckedCreateInput[];
  representativesData: Prisma.ElectoralHistoryRepresentativesUncheckedCreateInput[];
  detailedExpensesListData: Prisma.ElectoralHistoryDetailedExpensesListUncheckedCreateInput[];
  detailedRevenuesListData: Prisma.ElectoralHistoryDetailedRevenuesListUncheckedCreateInput[];
}

export interface ElectoralHistoryRepository {
  getProfileYears(id: string): Promise<{ id: string; election_year: string }[]>;
  getDetailsById(id: string): Promise<ElectoralHistoryDetails | null>;
  create(data: CreateElectoralHistory): Promise<void>;
}
