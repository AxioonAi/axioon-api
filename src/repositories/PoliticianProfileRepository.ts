import {
	City,
	CityElectorateData,
	CityIBGEData,
	CityPollingPlace,
	FacebookBaseData,
	FacebookPostBaseData,
	FacebookPostComments,
	InstagramBaseData,
	InstagramPost,
	InstagramPostComment,
	PoliticianProfile,
	Role,
	TiktokBaseData,
	TiktokCommentData,
	TiktokVideoData,
	YoutubeBaseData,
	YoutubeCommentData,
	YoutubeVideoData,
} from "@prisma/client";

export interface UserCityInterface extends PoliticianProfile {
	city: CityWithIBGEInterface;
}

interface CityWithIBGEInterface extends City {
	IBGEData: CityIBGEData[];
	pollingPlace: CityPollingPlace[];
	electorate: CityElectorateData[];
	politician: PoliticianProfile[];
}

interface UserYoutubeChannelInterface {
	id: string;
	youtube: string | null;
}

interface UserInstagramInterface {
	id: string;
	instagram: string | null;
}
interface UserTikTokInterface {
	id: string;
	tiktok: string | null;
}

interface UserFacebookInterface {
	id: string;
	facebook: string | null;
}

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
	findYoutubeStatistics(data: {
		id: string;
		period: number;
	}): Promise<youtubeData>;
	findFacebookStatistics(data: {
		id: string;
		period: number;
	}): Promise<facebookData>;
	findTiktokStatistics(data: {
		id: string;
		period: number;
	}): Promise<tiktokData>;
	findInstagramStatistics(data: {
		id: string;
		period: number;
	}): Promise<instagramData>;
	findSocialMediaStatistics(data: {
		id: string;
		period: number;
	}): Promise<socialMediaData>;
	findFollowersStatistics(data: {
		id: string;
		period: number;
	}): Promise<followersData>;
	findCommentsStatistics(data: {
		id: string;
		period: number;
	}): Promise<commentData | null>;
	findPostsStatistics(data: {
		id: string;
		period: number;
	}): Promise<postData | null>;

	findCpfList(): Promise<findCpfListData[]>;
}

interface findCpfListData {
	id: string;
	cpf: string;
}

interface youtubeData {
	current: {
		youtubeBaseData: YoutubeBaseData[];
		youtubeVideoData: YoutubeVideoData[];
		youtubeCommentData: YoutubeCommentData[];
	} | null;
	previous: {
		youtubeBaseData: YoutubeBaseData[];
		youtubeVideoData: YoutubeVideoData[];
		youtubeCommentData: YoutubeCommentData[];
	} | null;
}

interface facebookData {
	current: {
		facebookData: FacebookBaseData[];
		facebookPosts: FacebookPostBaseData[];
		facebookPostComments: FacebookPostComments[];
	} | null;
	previous: {
		facebookData: FacebookBaseData[];
		facebookPosts: FacebookPostBaseData[];
		facebookPostComments: FacebookPostComments[];
	} | null;
}
interface tiktokData {
	current: {
		tiktokData: TiktokBaseData[];
		tiktokVideoData: TiktokVideoData[];
		tiktokComments: TiktokCommentData[];
	} | null;
	previous: {
		tiktokData: TiktokBaseData[];
		tiktokVideoData: TiktokVideoData[];
		tiktokComments: TiktokCommentData[];
	} | null;
}

interface instagramData {
	current: {
		instagramData: InstagramBaseData[];
		instagramPosts: InstagramPost[];
		instagramPostComments: InstagramPostComment[];
	} | null;
	previous: {
		instagramData: InstagramBaseData[];
		instagramPosts: InstagramPost[];
		instagramPostComments: InstagramPostComment[];
	} | null;
}

interface socialMediaData {
	current: {
		youtubeBaseData: YoutubeBaseData[];
		youtubeVideoData: YoutubeVideoData[];
		youtubeCommentData: YoutubeCommentData[];
		facebookData: FacebookBaseData[];
		facebookPosts: FacebookPostBaseData[];
		facebookPostComments: FacebookPostComments[];
		tiktokData: TiktokBaseData[];
		tiktokVideoData: TiktokVideoData[];
		tiktokComments: TiktokCommentData[];
		instagramData: InstagramBaseData[];
		instagramPosts: InstagramPost[];
		instagramPostComments: InstagramPostComment[];
	} | null;
	previous: {
		youtubeBaseData: YoutubeBaseData[];
		youtubeVideoData: YoutubeVideoData[];
		youtubeCommentData: YoutubeCommentData[];
		facebookData: FacebookBaseData[];
		facebookPosts: FacebookPostBaseData[];
		facebookPostComments: FacebookPostComments[];
		tiktokData: TiktokBaseData[];
		tiktokVideoData: TiktokVideoData[];
		tiktokComments: TiktokCommentData[];
		instagramData: InstagramBaseData[];
		instagramPosts: InstagramPost[];
		instagramPostComments: InstagramPostComment[];
	} | null;
}

interface followersData {
	current: {
		instagramData: InstagramBaseData[];
		tiktokData: TiktokBaseData[];
		facebookData: FacebookBaseData[];
		youtubeBaseData: YoutubeBaseData[];
	} | null;
	previous: {
		instagramData: InstagramBaseData[];
		tiktokData: TiktokBaseData[];
		facebookData: FacebookBaseData[];
		youtubeBaseData: YoutubeBaseData[];
	} | null;
}

interface commentData {
	youtubeCommentData: { text: string }[];
	facebookPostComments: { text: string }[];
	tiktokComments: { text: string }[];
	instagramPostComments: { text: string }[];
}

interface postData {
	youtubeVideoData: YoutubeVideoData[];
	facebookPosts: FacebookPostBaseData[];
	tiktokVideoData: TiktokVideoData[];
	instagramPosts: InstagramPost[];
}

export interface findByStateData {
	social_name: string;
	id: string;
}

interface findNamesAndRolesData extends PoliticianProfile {
	facebookData: {
		title: string;
	}[];
}
