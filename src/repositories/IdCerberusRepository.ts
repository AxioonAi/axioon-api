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
	};
	personalIncomeTaxReturns: {
		year: string;
		bank: string;
		situation: string;
	};
}

export interface IdCerberusRepository {
	findData(cpf: string): Promise<IdCerberusResponseInterface>;
}
