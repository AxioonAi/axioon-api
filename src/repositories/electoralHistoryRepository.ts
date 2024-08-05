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

export interface ElectoralHistoryRepository {
  getProfileYears(id: string): Promise<{ id: string; election_year: string }[]>;
  getDetailsById(id: string): Promise<ElectoralHistoryDetails | null>;
}
