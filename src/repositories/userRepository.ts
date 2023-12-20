import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  update(
    id: string,
    data: {
      name?: string;
      email?: string;
      mobilePhone?: string;
      cpfCnpj?: string;
      birthDate?: string;
      password_hash?: string;
    }
  ): Promise<User>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByCpfCnpj(cpfCnpj: string): Promise<User | null>;
}
