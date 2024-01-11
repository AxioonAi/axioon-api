export interface LegalDataRepository {
	createMany(
		data: {
			politician_id: string;
			subject: string | null;
			judgingBy: string | null;
			causeValue: string | null;
			court: string | null;
			url: string | null;
			id: string;
			activePole: string;
			passivePole: string;
			startDate: Date;
			lastUpdate: Date;
		}[],
	): Promise<void>;
}
