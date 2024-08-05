import { HashtagMonitoringRepository } from "@/repositories/hashtagMonitoringRepository";
import { HashtagRepository } from "@/repositories/hashtagRepository";
import { Hashtag } from "@prisma/client";
interface getHashtagListUseCaseRequest {
  userId: string;
}

interface getHashtagListUseCaseResponse {
  hashtags: Hashtag[];
}

export class GetHashtagListUseCase {
  constructor(private hashtagRepository: HashtagRepository) {}

  async execute({
    userId,
  }: getHashtagListUseCaseRequest): Promise<getHashtagListUseCaseResponse> {
    const hashtags = await this.hashtagRepository.findByUserId(userId);

    return {
      hashtags,
    };
  }
}
