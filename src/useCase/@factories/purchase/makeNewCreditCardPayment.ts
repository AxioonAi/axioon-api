import { AsaasProductionRepository } from "@/repositories/Asaas/AsaasRepository";
import { PrismaSignaturePlanRepository } from "@/repositories/Prisma/PrismaSignaturePlanRepository";
import { PrismaUserPlanRepository } from "@/repositories/Prisma/PrismaUserPlanRepository";
import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { newCreditCardPurchaseUseCase } from "@/useCase/purchase/newCreditCardPurchase";

export function makeNewCreditCardPayment() {
  const planRepository = new PrismaSignaturePlanRepository();
  const userPlanRepository = new PrismaUserPlanRepository();
  const userRepository = new PrismaUserRepository();
  const asaasRepository = new AsaasProductionRepository();
  return new newCreditCardPurchaseUseCase(
    userRepository,
    planRepository,
    userPlanRepository,
    asaasRepository
  );
}
