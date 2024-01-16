import { PrismaUserPlanRepository } from "@/repositories/Prisma/PrismaUserPlanRepository";
import { UserSignatureValidationUseCase } from "@/useCase/user/UserSignatureValidation";

export function makeUserSignatureValidation() {
	const userSignatureRepository = new PrismaUserPlanRepository();
	return new UserSignatureValidationUseCase(userSignatureRepository);
}
