import { UserRepository } from "@/repositories/userRepository";

interface UserTikTokListUseCaseRequest {}

interface UserTikTokListUseCaseResponse {}

export class UserTikTokListUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({}: UserTikTokListUseCaseRequest): Promise<UserTikTokListUseCaseResponse> {
    const user = await this.userRepository.findTikTokList();

    return {
      tiktok: user,
    };
  }
}
