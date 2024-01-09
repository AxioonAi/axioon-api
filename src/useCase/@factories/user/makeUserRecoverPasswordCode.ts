import { PrismaUserRecoverPasswordCodeRepository } from "@/repositories/Prisma/PrismaUserRecoverPasswordCodeRepository";
import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UserRecoverPasswordCodeUseCase } from "@/useCase/user/UserRecoverPasswordCode";

export function makeUserRecoverPasswordCode() {
	const userRepository = new PrismaUserRepository();
	const userRecoverPasswordCodeRepository =
		new PrismaUserRecoverPasswordCodeRepository();
	return new UserRecoverPasswordCodeUseCase(
		userRepository,
		userRecoverPasswordCodeRepository,
	);
}
