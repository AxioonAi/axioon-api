import { IdCerberusRepository } from "@/repositories/IdCerberusRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { ElectoralHistoryRepository } from "@/repositories/electoralHistoryRepository";
import {
  CerberusInitializeBatchData,
  CerberusInitializeDataInterface,
} from "@/utils/cerberus/initialData";
import { CerberusProcessProfile } from "@/utils/cerberus/processData";

export class GetInitialLegalDataUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository,
    private cerberusRepository: IdCerberusRepository,
    private electoralHistory: ElectoralHistoryRepository
  ) {}

  async execute(): Promise<void> {
    const profiles = (
      await this.politicianProfileRepository.findProfileWithoutCerberusData()
    ).slice(0, 1);

    const batchSize = 2;
    const batches = [];

    for (let i = 0; i < profiles.length; i += batchSize) {
      batches.push(profiles.slice(i, i + batchSize));
    }

    const processedData = await Promise.all(
      batches.map(async (batch) => {
        const batchData = CerberusInitializeBatchData();

        await Promise.all(
          batch.map(async (profile) => {
            const idCerberus = await this.cerberusRepository.findData(
              profile.cpf
            );
            const filteredData = CerberusProcessProfile(profile, idCerberus);

            batchData.NotaryDat.push(
              ...filteredData.notaryAndProtests.NotaryDat
            );
            batchData.ProtestsData.push(
              ...filteredData.notaryAndProtests.ProtestsData
            );
            batchData.addressData.push(...filteredData.address);
            batchData.personalData.push(...filteredData.personalData);
            batchData.incomeTaxData.push(...filteredData.incomeTax);
            batchData.economicRelationshipsData.push(
              ...filteredData.economicRelationships
            );
            batchData.activeDebtData.push(...filteredData.activeDebt);
            batchData.electoralHistoryData.push(
              ...filteredData.electoralData.electoralHistoryData
            );
            batchData.electoralAssetsData.push(
              ...filteredData.electoralData.electoralAssetsData
            );
            batchData.electoralHistoryRevenueValueData.push(
              ...filteredData.electoralData.electoralHistoryRevenueValueData
            );
            batchData.electoralExpensesValueData.push(
              ...filteredData.electoralData.electoralExpensesValueData
            );
            batchData.electoralExpensesListData.push(
              ...filteredData.electoralData.electoralExpensesListData
            );
            batchData.providersRankingData.push(
              ...filteredData.electoralData.providersRankingData
            );
            batchData.donorsRankingData.push(
              ...filteredData.electoralData.donorsRankingData
            );
            batchData.representativesData.push(
              ...filteredData.electoralData.representativesData
            );
            batchData.detailedExpensesListData.push(
              ...filteredData.electoralData.detailedExpensesListData
            );
            batchData.detailedRevenuesListData.push(
              ...filteredData.electoralData.detailedRevenuesListData
            );
          })
        );

        return batchData;
      })
    );

    const finalData = processedData.reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        ...currentValue,
      };
    }, {} as CerberusInitializeDataInterface);

    await this.electoralHistory.create({
      electoralAssetsData: finalData.electoralAssetsData,
      electoralHistoryData: finalData.electoralHistoryData,
      electoralHistoryRevenueValueData:
        finalData.electoralHistoryRevenueValueData,
      electoralExpensesValueData: finalData.electoralExpensesValueData,
      electoralExpensesListData: finalData.electoralExpensesListData,
      providersRankingData: finalData.providersRankingData,
      donorsRankingData: finalData.donorsRankingData,
      representativesData: finalData.representativesData,
      detailedExpensesListData: finalData.detailedExpensesListData,
      detailedRevenuesListData: finalData.detailedRevenuesListData,
    });

    await this.politicianProfileRepository.createLegalDetails({
      activeDebtData: finalData.activeDebtData,
      addressData: finalData.addressData,
      personalData: finalData.personalData,
      incomeTaxData: finalData.incomeTaxData,
      economicRelationshipsData: finalData.economicRelationshipsData,
      NotaryDat: finalData.NotaryDat,
      ProtestsData: finalData.ProtestsData,
    });

    return;
  }
}
