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

export interface StatisticsData {
	id: string;
	period: number;
}

export interface CityWithIBGEInterface extends City {
	IBGEData: CityIBGEData[];
	pollingPlace: CityPollingPlace[];
	electorate: CityElectorateData[];
	politician: PoliticianProfile[];
}

export interface UserYoutubeChannelInterface {
	id: string;
	youtube: string | null;
}

export interface UserInstagramInterface {
	id: string;
	instagram: string | null;
}
export interface UserTikTokInterface {
	id: string;
	tiktok: string | null;
}

export interface UserFacebookInterface {
	id: string;
	facebook: string | null;
}

export interface findCpfListData {
	id: string;
	cpf: string;
}

export interface youtubeData {
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

export interface facebookData {
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
export interface tiktokData {
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

export interface instagramData {
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

export interface socialMediaData {
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

export interface followersData {
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

export interface commentData {
	youtubeCommentData: { text: string }[];
	facebookPostComments: { text: string }[];
	tiktokComments: { text: string }[];
	instagramPostComments: { text: string }[];
}

export interface postData {
	youtubeVideoData: YoutubeVideoData[];
	facebookPosts: FacebookPostBaseData[];
	tiktokVideoData: TiktokVideoData[];
	instagramPosts: InstagramPost[];
}

export interface findByStateData {
	social_name: string;
	id: string;
}

export interface findNamesAndRolesData extends PoliticianProfile {
	facebookData: {
		title: string;
	}[];
}
