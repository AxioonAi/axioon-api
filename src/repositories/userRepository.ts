import { City, CityIBGEData, Prisma, User } from "@prisma/client";

interface UserCityInterface {
  city: City;
}

interface CityWithIBGEInterface extends City {
  IBGEData: CityIBGEData;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByCpfCnpj(cpfCnpj: string): Promise<User | null>;
  findUserCity(id: string): Promise<UserCityInterface | null>;
}
