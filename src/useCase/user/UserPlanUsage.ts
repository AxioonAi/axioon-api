import { AuthenticateError } from "@/helper/errors/AuthenticateError";
import { UserRepository } from "@/repositories/userRepository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
interface UserPlanUsageUseCaseRequest {
  userId: string;
}

interface UserPlanUsageUseCaseResponse {
  usage: any;
}

export class UserPlanUsageUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: UserPlanUsageUseCaseRequest): Promise<UserPlanUsageUseCaseResponse> {
    const planUsage = await this.userRepository.getPlanUsage(userId);

    if (!planUsage || !planUsage.signature[0].plan) throw new Error();

    const formattedPlanUsage = {
      profiles: {
        used: planUsage?._count.user,
        total: planUsage?.signature[0]?.plan?.amount_of_monitoring,
      },
      hashtags: {
        used: planUsage?._count.hashtags,
        total: planUsage?.signature[0]?.plan?.amount_of_hashtags,
      },
    };

    return { usage: formattedPlanUsage };
  }
}
