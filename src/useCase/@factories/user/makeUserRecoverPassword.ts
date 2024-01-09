import { PrismaUserRecoverPasswordCodeRepository } from "@/repositories/Prisma/PrismaUserRecoverPasswordCodeRepository";
import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UserRecoverPasswordUseCase } from "@/useCase/user/UserRecoverPassword";

export function makeUserRecoverPassword() {
	const userRepository = new PrismaUserRepository();
	const userRecoverPasswordCodeRepository =
		new PrismaUserRecoverPasswordCodeRepository();
	return new UserRecoverPasswordUseCase(
		userRepository,
		userRecoverPasswordCodeRepository,
	);
}
