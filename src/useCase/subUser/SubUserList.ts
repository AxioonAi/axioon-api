import { SubUserRepository } from "@/repositories/SubUserRepository";

interface SubUserListUseCaseRequest {
  userId: string;
}

interface SubUserListUseCaseResponse {}

export class SubUserListUseCase {
  constructor(private subUserRepository: SubUserRepository) {}

  async execute({
    userId,
  }: SubUserListUseCaseRequest): Promise<SubUserListUseCaseResponse> {
    const subUsers = await this.subUserRepository.findByUserId(userId);

    return subUsers;
  }
}
