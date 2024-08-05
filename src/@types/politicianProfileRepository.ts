import {
  City,
  CityElectorateData,
  CityIBGEData,
  CityPollingPlace,
  FacebookBaseData,
  FacebookPostBaseData,
  FacebookPostComments,
  InstagramBaseData,
  InstagramEngager,
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
  TiktokEngager,
  TiktokVideoData,
  YoutubeBaseData,
  YoutubeCommentData,
  YoutubeVideoData,
  legalDataInvolved,
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
  cpf: string | null;
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
  tiktokComments: CustomTiktokCommentData[];
}

interface CustomTiktokCommentData extends TiktokCommentData {
  engager?: TiktokEngager | null;
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

interface LegalDataDetails extends LegalData {
  involved: legalDataInvolved[];
}

export interface LegalDetailsData extends PoliticianProfile {
  legalData: LegalDataDetails[];
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
  instagramMentionComments: instagramMentionComment[];
}

interface newsUser extends NewsUsers {
  news: NewsWithName;
}

interface NewsWithName extends News {
  website?: {
    name: string;
    website_logo?: string | null;
  } | null;
}

interface instagramMention extends InstagramMention {
  engager?: InstagramEngager | null;
}

interface instagramMentionComment extends InstagramMentionComment {
  engager?: InstagramEngager | null;
}

export interface findProfileWithoutFacebookDataInterface {
  id: string;
  facebook: string | null;
  facebookData: FacebookBaseData[];
}

export interface findProfileWithoutInstagramDataInterface {
  id: string;
  instagram: string;
  instagramData: InstagramBaseData[];
}

export interface findProfileWithoutYoutubeDataInterface {
  id: string;
  youtube: string | null;
  youtubeBaseData: YoutubeBaseData[];
}

export interface findProfileWithoutTiktokDataInterface {
  id: string;
  tiktok: string | null;
  tiktokData: TiktokBaseData[];
}

export interface findProfileWithoutLegalDataInterface {
  id: string;
  cpf: string | null;
  legalData: LegalData[];
}

export interface findProfileWithoutNewsDataInterface {
  id: string;
  social_name: string;
  news: NewsUsers[];
}
