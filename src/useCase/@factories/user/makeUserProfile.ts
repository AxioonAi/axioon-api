import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UserProfileUseCase } from "@/useCase/user/UserProfile";

export function makeUserProfile() {
	const userRepository = new PrismaUserRepository();
	return new UserProfileUseCase(userRepository);
}
