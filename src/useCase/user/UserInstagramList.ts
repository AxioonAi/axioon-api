import { UserRepository } from "@/repositories/userRepository";

interface UserInstagramListUseCaseRequest {}

interface UserInstagramListUseCaseResponse {}

export class UserInstagramListUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({}: UserInstagramListUseCaseRequest): Promise<UserInstagramListUseCaseResponse> {
    const user = await this.userRepository.findInstagramList();

    return {
      instagram: user,
    };
  }
}
