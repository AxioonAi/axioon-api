import {
  City,
  CityElectorateData,
  CityIBGEData,
  CityPollingPlace,
  PoliticianProfile,
  Role,
} from "@prisma/client";

export interface UserCityInterface {
  city: CityWithIBGEInterface;
}

interface CityWithIBGEInterface extends City {
  IBGEData: CityIBGEData[];
  pollingPlace: CityPollingPlace[];
  electorate: CityElectorateData[];
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
  findYoutubeDetails(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any>;
}
