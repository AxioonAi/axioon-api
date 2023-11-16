import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface PoliticianProfileTikTokListUseCaseRequest {}

interface PoliticianProfileTikTokListUseCaseResponse {}

export class PoliticianProfileTikTokListUseCase {
  constructor(private userRepository: PoliticianProfileRepository) {}

  async execute({}: PoliticianProfileTikTokListUseCaseRequest): Promise<PoliticianProfileTikTokListUseCaseResponse> {
    const user = await this.userRepository.findTikTokList();

    return {
      tiktok: user,
    };
  }
}
