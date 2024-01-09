import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UpdateUserPasswordUseCase } from "@/useCase/user/UpdateUserPassword";

export function makeUpdateUserPassword() {
	const userRepository = new PrismaUserRepository();
	return new UpdateUserPasswordUseCase(userRepository);
}
