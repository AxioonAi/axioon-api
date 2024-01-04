import { AsaasProductionRepository } from "@/repositories/Asaas/AsaasRepository";
import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { CreateAsaasUserUseCase } from "@/useCase/asaas/CreateAsaasUser";

export function makeAsaasCreateUser() {
	const asaasRepository = new AsaasProductionRepository();
	const userRepository = new PrismaUserRepository();
	return new CreateAsaasUserUseCase(asaasRepository, userRepository);
}
