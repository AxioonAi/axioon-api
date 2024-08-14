import { IdCerberusResponseInterface } from "@/repositories/IdCerberusRepository";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export function CerberusProcessProfile(
  profile: { id: string; cpf: string },
  idCerberus: IdCerberusResponseInterface
) {
  const address = processAddresses(profile, idCerberus);
  const personalData = processPersonalData(profile, idCerberus);
  const incomeTax = processIncomeTax(profile, idCerberus);
  const economicRelationships = processEconomicRelationships(
    profile,
    idCerberus
  );
  const activeDebt = processActiveDebt(profile, idCerberus);
  const notaryAndProtests = processNotaryAndProtests(profile, idCerberus);
  const electoralData = processElectoralData(profile, idCerberus);

  return {
    address,
    personalData,
    incomeTax,
    economicRelationships,
    activeDebt,
    notaryAndProtests,
    electoralData,
  };
}

function processAddresses(
  profile: { id: string; cpf: string },
  idCerberus: IdCerberusResponseInterface
) {
  const addressData: Prisma.PersonalAddressUncheckedCreateInput[] = [];

  for (const address of idCerberus.addresses) {
    addressData.push({
      city: address.city,
      state: address.state,
      address: address.address,
      addressType: address.addressType,
      country: address.country,
      neighborhood: address.neighborhood,
      zipcode: address.zipcode,
      politician_id: profile.id,
    });
  }

  return addressData;
}

function processPersonalData(
  profile: { id: string; cpf: string },
  idCerberus: IdCerberusResponseInterface
) {
  const personalData: Prisma.PersonalDataUncheckedCreateInput[] = [];

  personalData.push({
    fatherName: idCerberus.fatherName,
    federalCrime: idCerberus.federalCrime,
    federalCrimeCertificate: idCerberus.federalCrimeCertificate,
    federalStatus: idCerberus.federalStatus,
    politician_id: profile.id,
    estimated_patrimony: idCerberus.equityEstimate,
    estimated_recipe: idCerberus.monthlyIncomeEstimate,
  });

  return personalData;
}

function processIncomeTax(
  profile: { id: string; cpf: string },
  idCerberus: IdCerberusResponseInterface
) {
  const incomeTaxData: Prisma.personalIncomeTaxReturnsUncheckedCreateInput[] =
    [];

  for (const incomeTax of idCerberus.personalIncomeTaxReturns) {
    incomeTaxData.push({
      situation: incomeTax.situation,
      bankAgency: incomeTax.bank,
      year: incomeTax.year,
      politician_id: profile.id,
    });
  }

  return incomeTaxData;
}

function processEconomicRelationships(
  profile: { id: string; cpf: string },
  idCerberus: IdCerberusResponseInterface
) {
  const economicRelationshipsData: Prisma.PersonalEconomicRelationshipUncheckedCreateInput[] =
    [];

  for (const economicRelationship of idCerberus.economicRelationships) {
    economicRelationshipsData.push({
      relationshipType: economicRelationship.relationshipType,
      cnpj: economicRelationship.cnpj,
      relationshipLevel: economicRelationship.relationshipLevel,
      endDate: economicRelationship.endDate,
      startDate: economicRelationship.startDate,
      name: economicRelationship.name,
      country: economicRelationship.country,
      politician_id: profile.id,
    });
  }

  return economicRelationshipsData;
}

function processActiveDebt(
  profile: { id: string; cpf: string },
  idCerberus: IdCerberusResponseInterface
) {
  const activeDebtData: Prisma.ActiveDebtUncheckedCreateInput[] = [];

  for (const activeDebt of idCerberus.activeDebt) {
    activeDebtData.push({
      consolidatedValue: activeDebt.consolidatedValue,
      debtOrigin: activeDebt.debtOrigin,
      politicianProfileId: profile.id,
      registrationNumber: activeDebt.registrationNumber,
      registrationSituation: activeDebt.registrationSituation,
      registrationSituationType: activeDebt.registrationSituationType,
      responsibleUnity: activeDebt.responsibleUnity,
      responsibleUnityUF: activeDebt.responsibleUnityUF,
      source: activeDebt.source,
    });
  }

  return activeDebtData;
}

function processNotaryAndProtests(
  profile: { id: string; cpf: string },
  idCerberus: IdCerberusResponseInterface
) {
  const NotaryDat: Prisma.NotaryUncheckedCreateInput[] = [];
  const ProtestsData: Prisma.ProtestsUncheckedCreateInput[] = [];

  for (const notary of idCerberus.protest) {
    const id = randomUUID();
    NotaryDat.push({
      id,
      address: notary.address,
      city: notary.city,
      name: notary.notary,
      numberOfTitles: notary.numberOfTitles,
      phone: notary.phone,
      politicianProfileId: profile.id,
    });

    for (const protest of notary.protests) {
      ProtestsData.push({
        date: protest.date,
        cpfCnpj: protest.cpfCnpj,
        dueDate: protest.dueDate,
        notaryId: id,
        protestDate: protest.protestDate,
        value: protest.value,
      });
    }
  }

  return { NotaryDat, ProtestsData };
}

function processElectoralData(
  profile: { id: string; cpf: string },
  idCerberus: IdCerberusResponseInterface
) {
  const electoralHistoryData: Prisma.ElectoralHistoryUncheckedCreateInput[] =
    [];

  const electoralAssetsData: Prisma.ElectoralHistoryAssetUncheckedCreateInput[] =
    [];
  const electoralHistoryRevenueValueData: Prisma.ElectoralHistoryConsolidatedRevenueValuesUncheckedCreateInput[] =
    [];
  const electoralExpensesValueData: Prisma.ElectoralHistoryConsolidatedExpensesValuesUncheckedCreateInput[] =
    [];
  const electoralExpensesListData: Prisma.ElectoralHistoryAggregatedExpensesListUncheckedCreateInput[] =
    [];
  const providersRankingData: Prisma.ElectoralHistoryProvidersRankingUncheckedCreateInput[] =
    [];
  const donorsRankingData: Prisma.ElectoralHistoryDonorsRankingUncheckedCreateInput[] =
    [];
  const representativesData: Prisma.ElectoralHistoryRepresentativesUncheckedCreateInput[] =
    [];
  const detailedExpensesListData: Prisma.ElectoralHistoryDetailedExpensesListUncheckedCreateInput[] =
    [];
  const detailedRevenuesListData: Prisma.ElectoralHistoryDetailedRevenuesListUncheckedCreateInput[] =
    [];

  for (const electoralHistory of idCerberus.electoralData.electionData) {
    const id = randomUUID();
    electoralHistoryData.push({
      id,
      ballot_local: electoralHistory.applicationPlace,
      ballot_name: electoralHistory.ballotName,
      ballot_number: String(electoralHistory.ballotNumber),
      ballot_state: electoralHistory.applicationUf,
      birth_date: electoralHistory.birthDate,
      campaign_total_spend: electoralHistory.campaignSpentValue,
      coalition: electoralHistory.coalitionName,
      coalition_composition: electoralHistory.coalitionComposition,
      color_race: electoralHistory.colorRace,
      details_url: electoralHistory.url,
      election_type: electoralHistory.electionType,
      election_year: electoralHistory.electionYear,
      email: electoralHistory.emails[0],
      first_round_total_spend: electoralHistory.campaignSpendingFirstRound,
      full_name: electoralHistory.fullName,
      gender: electoralHistory.gender,
      has_elected: electoralHistory.wasElected,
      marital_status: electoralHistory.maritalStatus,
      nationality: electoralHistory.nationality,
      occupation: electoralHistory.occupation,
      photo_url: electoralHistory.imgUrl,
      political_group: electoralHistory.partyName,
      political_group_number: String(electoralHistory.partyNumber),
      politician_profile_id: profile.id,
      role: electoralHistory.applicationRole,
      school_level: electoralHistory.instructionLevel,
      second_round_total_spend: electoralHistory.campaignSpendingSecondRound,
      total_declared_assets: electoralHistory.totalAssetsValue,
    });

    for (const asset of electoralHistory.assetsList) {
      electoralAssetsData.push({
        description: asset.description,
        type: asset.type,
        electoral_History_id: id,
        value: asset.value,
      });
    }

    for (const representatives of electoralHistory.accountability
      .representatives) {
      representativesData.push({
        begin_date: representatives.beginDate,
        electoral_History_id: id,
        end_date: representatives.endDate,
        name: representatives.memberName,
        registration_number: representatives.registrationNumber,
        role: representatives.role,
      });
    }

    for (const donator of electoralHistory.accountability.donorsRanking) {
      donorsRankingData.push({
        doc_number: donator.docNumber,
        electoral_History_id: id,
        name: donator.name,
        number_of_donations: donator.humberDonations,
        total_value: donator.totalValue,
      });
    }

    for (const provider of electoralHistory.accountability.providersRanking) {
      providersRankingData.push({
        doc_number: provider.docNumber,
        electoral_History_id: id,
        name: provider.name,
        number_of_donations: provider.numberDonations,
        total_value: provider.totalValue,
      });
    }

    for (const expenses of electoralHistory.accountability
      .aggregatedExpensesList) {
      electoralExpensesListData.push({
        description: expenses.description,
        number_of_times: expenses.numberOfTimes,
        total_value: expenses.totalValue,
        electoral_History_id: id,
      });
    }

    const revenueData =
      electoralHistory.accountability.consolidatedRevenueValues;

    electoralHistoryRevenueValueData.push({
      electoral_History_id: id,
      total_crowdfunding: revenueData.totalCrowdfunding,
      total_donation_by_companies: revenueData.totalDonationByCompanies,
      total_donation_by_internet: revenueData.totalDonationByInternet,
      total_donation_by_parties: revenueData.totalDonationByParties,
      total_donation_by_people: revenueData.totalDonationByPeople,
      total_estimated_resources: revenueData.totalEstimatedResources,
      total_financial_resources: revenueData.totalFinancialResources,
      total_own_resources: revenueData.totalOwnResources,
      total_received_resources: revenueData.totalReceivedResources,
      total_donation_ronis: revenueData.totalDonationRONIs,
    });

    const expensesData =
      electoralHistory.accountability.consolidatedExpensesValues;

    electoralExpensesValueData.push({
      electoral_History_id: id,
      donations_to_other_candidates: expensesData.donationsToOtherCandidates,
      estimated_expenses: expensesData.estimatedExpenses,
      financial_expenses: expensesData.financialExpenses,
      other_resources_expenses: expensesData.otherResourcesExpenses,
      party_funds_expenses: expensesData.partyFundsExpenses,
      special_funds_expenses: expensesData.specialFundsExpenses,
      total_expenses_contracted: expensesData.totalExpensesContracted,
      total_expenses_paid: expensesData.totalExpensesPaid,
      expenses_threshold: expensesData.expensesThreshold,
    });

    for (const detailedExpenses of electoralHistory.accountability
      .detailedExpensesList) {
      detailedExpensesListData.push({
        description: detailedExpenses.description,
        contractor_benefited: detailedExpenses.contractorBenefited,
        date: detailedExpenses.date,
        document_number: detailedExpenses.documentNumber,
        expense_type: detailedExpenses.expenseType,
        provider_name: detailedExpenses.providerName,
        resource_type: detailedExpenses.resourceType,
        value: detailedExpenses.value,
        electoral_History_id: id,
      });
    }

    for (const detailedRevenues of electoralHistory.accountability
      .detailedRevenuesList) {
      detailedRevenuesListData.push({
        date: detailedRevenues.date,
        document_number: detailedRevenues.documentNumber,
        resource_type: detailedRevenues.resourceType,
        value: detailedRevenues.value,
        electoral_History_id: id,
        donator_doc_number: detailedRevenues.donorDocNumber,
        donator_name: detailedRevenues.donorName,
      });
    }
  }

  return {
    electoralHistoryData,
    electoralAssetsData,
    representativesData,
    donorsRankingData,
    providersRankingData,
    electoralExpensesListData,
    electoralExpensesValueData,
    electoralHistoryRevenueValueData,
    detailedExpensesListData,
    detailedRevenuesListData,
  };
}
