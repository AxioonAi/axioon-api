export interface IdCerberusResponseInterface {
  federalCrime: string;
  federalCrimeCertificate: string;
  federalStatus: string;
  fatherName: string;
  monthlyIncomeEstimate: string;
  equityEstimate: string;
  addresses: {
    zipcode: string;
    country: string;
    address: string;
    city: string;
    addressType: string;
    neighborhood: string;
    state: string;
  }[];
  economicRelationships: {
    country: string;
    relationshipType: string;
    endDate: Date;
    startDate: Date;
    name: string;
    cnpj: string;
    relationshipLevel: string;
  }[];
  personalIncomeTaxReturns: {
    year: string;
    bank: string;
    situation: string;
  }[];
  // electoralData: ElectoralData;
  activeDebt: {
    source: string;
    debtOrigin: string;
    consolidatedValue: string;
    responsibleUnity: string;
    responsibleUnityUF: string;
    registrationNumber: string;
    registrationSituationType: string;
    registrationSituation: string;
  }[];
  // protest: {
  //   notary: string;
  //   getDetails: string | null;
  //   city: string;
  //   numberOfTitles: string;
  //   address: string;
  //   phone: string;
  //   protests: {
  //     cpfCnpj: string;
  //     date: string;
  //     protestDate: string;
  //     dueDate: string;
  //     value: string;
  //   }[];
  // }[];
}

interface ElectoralData {
  hasRunForOffice: boolean;
  hasBeenElected: boolean;
  numberOfTimesRanForOffice: number;
  numberOfTimesElected: number;
  lastElectedRole: string;
  firstElectionYearRanForOffice: string;
  lastElectionYearRanForOffice: string;
  firstElectionYearElected: string;
  lastElectionYearElected: string;
  electionData: ElectionDatum[];
}

interface ElectionDatum {
  ballotName: string;
  ballotNumber: number;
  fullName: string;
  normalizedName: string;
  docNumber: string;
  voterNumber: string;
  url: string;
  electionYear: string;
  electionType: string;
  applicationRole: string;
  applicationPlace: string;
  applicationUf: string;
  campaignCNPJ: string;
  status: string;
  wasElected: boolean;
  candidateSituation: string;
  applicationSituation: string;
  imgUrl: string;
  emails: string[];
  gender: string;
  maritalStatus: string;
  colorRace: string;
  instructionLevel: string;
  occupation: string;
  birthDate: string;
  nationality: string;
  birthUF: string;
  coalitionName: string;
  coalitionComposition: string;
  partyNumber: number;
  partyAcronym: string;
  partyName: string;
  drapProcessNumber: string;
  registerProcessNumber: string;
  accountabilityProcessNumber: string;
  campaignSpentValue: number;
  campaignSpendingFirstRound: number;
  campaignSpendingSecondRound: number;
  totalAssetsValue: number;
  assetsList: Asset[];
  accountability: Accountability;
}

interface Asset {
  description: string;
  type: string;
  value: number;
}

interface Accountability {
  accountabilityControlNumber: string;
  consolidatedRevenueValues: ConsolidatedRevenueValues;
  consolidatedExpensesValues: ConsolidatedExpensesValues;
  aggregatedExpensesList: AggregatedExpensesList[];
  providersRanking: ProvidersRanking[];
  donorsRanking: DonorsRanking[];
  representatives: Representatives[];
  detailedRevenuesList: DetailedRevenuesList[];
  detailedExpensesList: DetailedExpensesList[];
  accountabilityLastUpdateDate: string;
}

interface ConsolidatedRevenueValues {
  totalReceivedResources: number;
  totalFinancialResources: number;
  totalEstimatedResources: number;
  totalDonationByPeople: number;
  totalDonationByCompanies: number;
  totalDonationByParties: number;
  totalDonationByInternet: number;
  totalDonationRONIs: number;
  totalOwnResources: number;
  totalCrowdfunding: number;
}

interface ConsolidatedExpensesValues {
  expensesThreshold: number;
  totalExpensesContracted: number;
  totalExpensesPaid: number;
  donationsToOtherCandidates: number;
  partyFundsExpenses: number;
  specialFundsExpenses: number;
  otherResourcesExpenses: number;
  financialExpenses: number;
  estimatedExpenses: number;
}

interface AggregatedExpensesList {
  description: string;
  numberOfTimes: string;
  totalValue: number;
}

interface ProvidersRanking {
  docNumber: string;
  name: string;
  numberDonations: string;
  totalValue: number;
}

interface DonorsRanking {
  docNumber: string;
  name: string;
  humberDonations: string;
  totalValue: number;
  isCrowdfunding: boolean;
}

interface Representatives {
  memberName: string;
  role: string;
  registrationNumber: string;
  beginDate: string;
  endDate: string;
}

interface DetailedRevenuesList {
  donorDocNumber: string;
  donorName: string;
  date: string;
  resourceType: string;
  value: number;
  documentNumber: string;
}

interface DetailedExpensesList {
  providerName: string;
  date: string;
  resourceType: string;
  expenseType: string;
  description: string;
  value: number;
  documentNumber: string;
  contractorBenefited: string;
}

export interface IdCerberusRepository {
  findData(cpf: string): Promise<IdCerberusResponseInterface>;
}
