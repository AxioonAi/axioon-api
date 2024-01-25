import {
	LegalDetailsData,
	MentionsData,
	MetaAdsData,
	StatisticsData,
	UserCityInterface,
	UserFacebookInterface,
	UserInstagramInterface,
	UserTikTokInterface,
	UserYoutubeChannelInterface,
	commentData,
	facebookData,
	findByStateData,
	findCpfListData,
	findNamesAndRolesData,
	followersData,
	instagramData,
	postData,
	socialMediaData,
	tiktokData,
	youtubeData,
} from "@/@types/politicianProfileRepository";
import { PoliticianProfile, Role } from "@prisma/client";

export interface PoliticianProfileRepository {
	create(data: {
		cpf: string;
		instagram: string;
		youtube?: string;
		tiktok?: string;
		facebook?: string;
		social_name: string;
		city_id: string;
		full_name: string;
		role: Role;
		political_group_id: string;
	}): Promise<PoliticianProfile>;
	findByCpf(cpf: string): Promise<PoliticianProfile | null>;
	findUserCity(id: string): Promise<UserCityInterface | null>;
	findYoutubeChannelList(): Promise<UserYoutubeChannelInterface[]>;
	findInstagramList(): Promise<UserInstagramInterface[]>;
	findTikTokList(): Promise<UserTikTokInterface[]>;
	findFacebookList(): Promise<UserFacebookInterface[]>;
	findByState(state: string): Promise<findByStateData[]>;
	findNamesAndRoles(): Promise<findNamesAndRolesData[]>;
	findMentionsStatistics(data: StatisticsData): Promise<MentionsData | null>;
	findMetaAdsStatistics(id: string): Promise<MetaAdsData | null>;
	findYoutubeStatistics(data: StatisticsData): Promise<youtubeData | null>;
	findFacebookStatistics(data: StatisticsData): Promise<facebookData | null>;
	findTiktokStatistics(data: StatisticsData): Promise<tiktokData | null>;
	findInstagramStatistics(data: StatisticsData): Promise<instagramData | null>;
	findSocialMediaStatistics(
		data: StatisticsData,
	): Promise<socialMediaData | null>;
	findFollowersStatistics(data: StatisticsData): Promise<followersData | null>;
	findCommentsStatistics(data: StatisticsData): Promise<commentData | null>;
	findPostsStatistics(data: StatisticsData): Promise<postData | null>;
	findCpfList(): Promise<findCpfListData[]>;
	findLegalDetails(id: string): Promise<LegalDetailsData | null>;
}
