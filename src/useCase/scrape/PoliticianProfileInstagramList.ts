import { UserInstagramInterface } from "@/@types/politicianProfileRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";

interface PoliticianProfileInstagramListUseCaseResponse {
  instagram: UserInstagramInterface[];
}

export class PoliticianProfileInstagramListUseCase {
  constructor(private userRepository: PoliticianProfileRepository) {}

  async execute(): Promise<PoliticianProfileInstagramListUseCaseResponse> {
    const user = await this.userRepository.findInstagramList();

    return {
      instagram: user.filter(
        (profile) => profile.instagram !== null && profile.instagram !== ""
      ),
    };
  }
}
