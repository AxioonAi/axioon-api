import { Prisma, SexType, SignaturePlan, User } from "@prisma/client";

interface PlanUsage extends User {
  _count: {
    hashtags: number;
    user: number;
  };
  signature: {
    plan: SignaturePlan;
  }[];
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  update(
    id: string,
    data: {
      name?: string;
      email?: string;
      mobilePhone?: string;
      cpfCnpj?: string;
      sex?: SexType;
      birthDate?: string;
      password_hash?: string;
    }
  ): Promise<User>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByCpfCnpj(cpfCnpj: string): Promise<User | null>;
  getPlanUsage(userId: string): Promise<PlanUsage | null>;
}
