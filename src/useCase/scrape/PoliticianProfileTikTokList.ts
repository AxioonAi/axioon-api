import { UserTikTokInterface } from "@/@types/politicianProfileRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface PoliticianProfileTikTokListUseCaseResponse {
  tiktok: UserTikTokInterface[];
}

export class PoliticianProfileTikTokListUseCase {
  constructor(private userRepository: PoliticianProfileRepository) {}

  async execute(): Promise<PoliticianProfileTikTokListUseCaseResponse> {
    const user = await this.userRepository.findTikTokList();

    return {
      tiktok: user.filter(
        (profile) => profile.tiktok !== null && profile.tiktok !== ""
      ),
    };
  }
}
