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
  findProfileWithoutFacebookDataInterface,
  findProfileWithoutInstagramDataInterface,
  findProfileWithoutLegalDataInterface,
  findProfileWithoutNewsDataInterface,
  findProfileWithoutTiktokDataInterface,
  findProfileWithoutYoutubeDataInterface,
  followersData,
  instagramData,
  postData,
  socialMediaData,
  tiktokData,
  youtubeData,
} from "@/@types/politicianProfileRepository";
import { PoliticianProfile, Prisma, Role } from "@prisma/client";

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
    campaign_name?: string;
    political_group_id: string;
  }): Promise<PoliticianProfile>;
  createLegalDetails(data: {
    addressData: Prisma.PersonalAddressUncheckedCreateInput[];
    personalData: Prisma.PersonalDataUncheckedCreateInput[];
    incomeTaxData: Prisma.personalIncomeTaxReturnsUncheckedCreateInput[];
    economicRelationshipsData: Prisma.PersonalEconomicRelationshipUncheckedCreateInput[];
    activeDebtData: Prisma.ActiveDebtUncheckedCreateInput[];
    NotaryDat: Prisma.NotaryUncheckedCreateInput[];
    ProtestsData: Prisma.ProtestsUncheckedCreateInput[];
  }): Promise<void>;
  update(
    id: string,
    data: {
      instagram?: string | null;
      youtube?: string | null;
      tiktok?: string | null;
      facebook?: string | null;
    }
  ): Promise<PoliticianProfile>;
  profileExists(data: {
    cpf?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    instagram?: string;
    fullName?: string;
  }): Promise<PoliticianProfile | null>;
  findById(id: string): Promise<PoliticianProfile | null>;
  findUserCity(id: string): Promise<UserCityInterface | null>;
  findYoutubeChannelList(): Promise<UserYoutubeChannelInterface[]>;
  findInstagramList(): Promise<UserInstagramInterface[]>;
  findTikTokList(): Promise<UserTikTokInterface[]>;
  findFacebookList(): Promise<UserFacebookInterface[]>;
  findByState(state: string): Promise<findByStateData[]>;
  findNamesAndRoles(): Promise<findNamesAndRolesData[]>;

  findMentionsStatistics(data: StatisticsData): Promise<MentionsData | null>;
  findMetaAdsStatistics(data: StatisticsData): Promise<MetaAdsData | null>;
  findYoutubeStatistics(data: StatisticsData): Promise<youtubeData | null>;
  findFacebookStatistics(data: StatisticsData): Promise<facebookData | null>;
  findTiktokStatistics(data: StatisticsData): Promise<tiktokData | null>;
  findInstagramStatistics(data: StatisticsData): Promise<instagramData | null>;
  findSocialMediaStatistics(
    data: StatisticsData
  ): Promise<socialMediaData | null>;

  findFollowersStatistics(data: StatisticsData): Promise<followersData | null>;
  findCommentsStatistics(data: StatisticsData): Promise<commentData | null>;
  findPostsStatistics(data: StatisticsData): Promise<postData | null>;
  findCpfList(): Promise<findCpfListData[]>;
  findLegalDetails(id: string): Promise<LegalDetailsData | null>;
  findProfileWithoutFacebookData(): Promise<
    findProfileWithoutFacebookDataInterface[]
  >;
  findProfileWithoutYoutubeData(): Promise<
    findProfileWithoutYoutubeDataInterface[]
  >;
  findProfileWithoutTiktokData(): Promise<
    findProfileWithoutTiktokDataInterface[]
  >;
  findProfileWithoutLegalData(): Promise<
    findProfileWithoutLegalDataInterface[]
  >;
  findProfileWithoutInstagramData(): Promise<
    findProfileWithoutInstagramDataInterface[]
  >;
  findProfileWithoutNews(
    state: string
  ): Promise<findProfileWithoutNewsDataInterface[]>;
  findProfileWithoutCerberusData(): Promise<{ id: string; cpf: string }[]>;
}
