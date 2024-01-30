import {
	PoliticalGroup,
	PoliticianProfile,
	PoliticianProfileMonitoring,
} from "@prisma/client";

interface PoliticianProfileWithPoliticalGroup extends PoliticianProfile {
	politicalGroup: PoliticalGroup;
	instagramData: {
		profilePicture: string;
	}[];
}

interface findUsersByProfileId extends PoliticianProfileMonitoring {
	politicianProfile: PoliticianProfileWithPoliticalGroup;
}

export interface PoliticianProfileMonitoringRepository {
	create(data: {
		user_id: string;
		politician_profile_id: string;
	}): Promise<void>;
	verify(data: {
		profileId: string;
		userId: string;
	}): Promise<PoliticianProfileMonitoring | null>;
	findManyByUserId(userId: string): Promise<findUsersByProfileId[]>;
	findUsersByProfileId(ids: string[]): Promise<findUsersByProfileId[]>;
}
