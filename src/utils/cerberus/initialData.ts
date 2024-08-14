import { Prisma } from "@prisma/client";

export interface CerberusInitializeDataInterface {
  addressData: Prisma.PersonalAddressUncheckedCreateInput[];
  personalData: Prisma.PersonalDataUncheckedCreateInput[];
  incomeTaxData: Prisma.personalIncomeTaxReturnsUncheckedCreateInput[];
  economicRelationshipsData: Prisma.PersonalEconomicRelationshipUncheckedCreateInput[];
  activeDebtData: Prisma.ActiveDebtUncheckedCreateInput[];
  NotaryDat: Prisma.NotaryUncheckedCreateInput[];
  ProtestsData: Prisma.ProtestsUncheckedCreateInput[];
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

export function CerberusInitializeBatchData(): CerberusInitializeDataInterface {
  return {
    addressData: [],
    personalData: [],
    incomeTaxData: [],
    economicRelationshipsData: [],
    activeDebtData: [],
    NotaryDat: [],
    ProtestsData: [],
    electoralHistoryData: [],
    electoralAssetsData: [],
    electoralHistoryRevenueValueData: [],
    electoralExpensesValueData: [],
    electoralExpensesListData: [],
    providersRankingData: [],
    donorsRankingData: [],
    representativesData: [],
    detailedExpensesListData: [],
    detailedRevenuesListData: [],
  };
}
