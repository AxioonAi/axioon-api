import { UserRepository } from "@/repositories/userRepository";

interface UserFacebookListUseCaseRequest {}

interface UserFacebookListUseCaseResponse {}

export class UserFacebookListUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({}: UserFacebookListUseCaseRequest): Promise<UserFacebookListUseCaseResponse> {
    const user = await this.userRepository.findFacebookList();

    return {
      facebook: user,
    };
  }
}
