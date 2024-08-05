import { PrismaUserRepository } from "@/repositories/Prisma/PrismaUserRepository";
import { UserPlanUsageUseCase } from "@/useCase/user/UserPlanUsage";

export function makeUserPlanUsage() {
  const userRepository = new PrismaUserRepository();

  return new UserPlanUsageUseCase(userRepository);
}
