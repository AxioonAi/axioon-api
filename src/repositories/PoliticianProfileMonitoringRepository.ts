import {
  City,
  FacebookPostBaseData,
  InstagramPost,
  PoliticalGroup,
  PoliticianProfile,
  PoliticianProfileMonitoring,
  TiktokVideoData,
  YoutubeVideoData,
} from "@prisma/client";

interface PoliticianProfileWithPoliticalGroup extends PoliticianProfile {
  politicalGroup: PoliticalGroup;
  city: City;
  instagramData: {
    profilePicture: string;
  }[];
}

interface PoliticianProfileWithPosts extends PoliticianProfile {
  youtubeVideoData: YoutubeVideoData[];
  facebookPosts: FacebookPostBaseData[];
  tiktokVideoData: TiktokVideoData[];
  instagramPosts: InstagramPost[];
}

interface findUsersByProfileId extends PoliticianProfileMonitoring {
  politicianProfile: PoliticianProfileWithPoliticalGroup;
}

interface findUsersByProfileIdWithPosts extends PoliticianProfileMonitoring {
  politicianProfile: PoliticianProfileWithPosts;
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
  findManyByUserIdWithPosts(
    userId: string
  ): Promise<findUsersByProfileIdWithPosts[]>;
  findUsersByProfileId(ids: string[]): Promise<findUsersByProfileId[]>;
  remove(data: { profileId: string; userId: string }): Promise<void>;
}
