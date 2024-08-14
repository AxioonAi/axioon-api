import { IdCerberusAPI } from "@/utils/idCerberus";
import {
  IdCerberusRepository,
  IdCerberusResponseInterface,
} from "../IdCerberusRepository";

export class IdCerberusProductionRepository implements IdCerberusRepository {
  async findData(cpf: string) {
    const [
      financial_data,
      address,
      federalCrime,
      economicRelationships,
      personDataEnrichment,
      electoralData,
      activeDebt,
      activeDebtCertificate,
    ] = await Promise.all([
      IdCerberusAPI({ cpf, service: "service_financial_information" }),
      IdCerberusAPI({ cpf, service: "SERVICE_ADDRESS" }),
      IdCerberusAPI({ cpf, service: "service_criminal_record_federal" }),
      IdCerberusAPI({ cpf, service: "economic_relationships" }),
      IdCerberusAPI({ cpf, service: "service_person_data_enrichment" }),
      IdCerberusAPI({ cpf, service: "SERVICE_ELECTION_CANDIDATE_DATA" }),
      IdCerberusAPI({ cpf, service: "SERVICE_ACTIVE_DEBT_PF" }),
      IdCerberusAPI({ cpf, service: "service_protest_clearance_certificate" }),
    ]);

    const formattedData: IdCerberusResponseInterface = {
      federalCrime: federalCrime.result.status,
      federalCrimeCertificate: federalCrime.result.certificateText,
      addresses: address.result.addresses,
      economicRelationships: economicRelationships.result.economicRelationships,
      personalIncomeTaxReturns: financial_data.result.personalIncomeTaxReturns,
      monthlyIncomeEstimate: financial_data.result.monthlyIncomeEstimate,
      equityEstimate: financial_data.result.equityEstimate,
      federalStatus: personDataEnrichment.result.status,
      fatherName: personDataEnrichment.result.fatherName,
      electoralData: electoralData.result,
      activeDebt: activeDebt.result.debts,
      protest: activeDebtCertificate.result.protestos,
    };

    return formattedData;
  }
}
