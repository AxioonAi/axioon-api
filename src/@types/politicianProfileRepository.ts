import {
	City,
	CityElectorateData,
	CityIBGEData,
	CityPollingPlace,
	FacebookBaseData,
	FacebookPostBaseData,
	FacebookPostComments,
	InstagramBaseData,
	InstagramMention,
	InstagramMentionComment,
	InstagramPost,
	InstagramPostComment,
	LegalData,
	MetaAdvertisingLib,
	MetaAdvertisingLibDeliveryByRegion,
	MetaAdvertisingLibDemographicDistribution,
	News,
	NewsUsers,
	PersonalAddress,
	PersonalData,
	PersonalEconomicRelationship,
	PoliticianProfile,
	TiktokBaseData,
	TiktokCommentData,
	TiktokVideoData,
	YoutubeBaseData,
	YoutubeCommentData,
	YoutubeVideoData,
	personalIncomeTaxReturns,
} from "@prisma/client";

export interface UserCityInterface extends PoliticianProfile {
	city: CityWithIBGEInterface;
}

export interface StatisticsData {
	id: string;
	gte: Date;
	lte: Date;
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
	youtubeBaseData: YoutubeBaseData[];
	youtubeVideoData: YoutubeVideoData[];
	youtubeCommentData: YoutubeCommentData[];
}

export interface facebookData {
	facebookData: FacebookBaseData[];
	facebookPosts: FacebookPostBaseData[];
	facebookPostComments: FacebookPostComments[];
}
export interface tiktokData {
	tiktokData: TiktokBaseData[];
	tiktokVideoData: TiktokVideoData[];
	tiktokComments: TiktokCommentData[];
}

export interface instagramData {
	instagramData: InstagramBaseData[];
	instagramPosts: InstagramPost[];
	instagramPostComments: InstagramPostComment[];
}

export interface socialMediaData {
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
}

export interface followersData {
	instagramData: InstagramBaseData[];
	tiktokData: TiktokBaseData[];
	facebookData: FacebookBaseData[];
	youtubeBaseData: YoutubeBaseData[];
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

export interface LegalDetailsData extends PoliticianProfile {
	legalData: LegalData[];
	personalData: PersonalData[];
	address: PersonalAddress[];
	economicRelationship: PersonalEconomicRelationship[];
	incomeTax: personalIncomeTaxReturns[];
}

export interface MetaAdsData {
	advertising: metaAds[];
}

interface metaAds extends MetaAdvertisingLib {
	deliveryByRegion: MetaAdvertisingLibDeliveryByRegion[];
	demographicDistribution: MetaAdvertisingLibDemographicDistribution[];
}

export interface MentionsData {
	news: newsUser[];
	instagramMention: instagramMention[];
}

interface newsUser extends NewsUsers {
	news: News;
}

interface instagramMention extends InstagramMention {
	comments: InstagramMentionComment[];
}