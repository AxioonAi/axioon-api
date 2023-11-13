import { SignaturePlan } from "@prisma/client";

export interface SignaturePlanRepository {
  findById(id: string): Promise<SignaturePlan | null>;
  findAll(): Promise<SignaturePlan[]>;
}
