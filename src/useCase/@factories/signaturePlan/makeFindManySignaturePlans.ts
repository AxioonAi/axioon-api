import { PrismaSignaturePlanRepository } from "@/repositories/Prisma/PrismaSignaturePlanRepository";
import { FindManySignaturePlanUseCase } from "@/useCase/signaturePlan/FindManySignaturePlan";

export function makeFindManySignaturePlans() {
	const signaturePlanRepository = new PrismaSignaturePlanRepository();
	return new FindManySignaturePlanUseCase(signaturePlanRepository);
}
