import { PoliticianProfile, Role } from "@prisma/client";

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
}
