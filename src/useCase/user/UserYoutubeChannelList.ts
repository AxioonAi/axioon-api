import { UserRepository } from "@/repositories/userRepository";

interface UserYoutubeChannelListUseCaseRequest {}

interface UserYoutubeChannelListUseCaseResponse {}

export class UserYoutubeChannelListUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({}: UserYoutubeChannelListUseCaseRequest): Promise<UserYoutubeChannelListUseCaseResponse> {
    const channelList = await this.userRepository.findYoutubeChannelList();

    return { channel: channelList };
  }
}
