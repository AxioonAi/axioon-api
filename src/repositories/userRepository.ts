import { City, CityIBGEData, Prisma, User } from "@prisma/client";

interface UserCityInterface {
  city: City;
}

interface CityWithIBGEInterface extends City {
  IBGEData: CityIBGEData;
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

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByCpfCnpj(cpfCnpj: string): Promise<User | null>;
  findUserCity(id: string): Promise<UserCityInterface | null>;
  findYoutubeChannelList(): Promise<UserYoutubeChannelInterface[]>;
  findInstagramList(): Promise<UserInstagramInterface[]>;
  findTikTokList(): Promise<UserTikTokInterface[]>;
  findFacebookList(): Promise<UserFacebookInterface[]>;
}
