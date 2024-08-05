import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { HashtagRepository } from "@/repositories/hashtagRepository";

interface FindHashtagDataUseCaseResponse {
  list: {
    id: string;
    hashtag: string;
  }[];
}

export class FindHashtagDataUseCase {
  constructor(private hashtagRepository: HashtagRepository) {}

  async execute(): Promise<FindHashtagDataUseCaseResponse> {
    const hashtags = await this.hashtagRepository.findMany();

    return { list: hashtags };
  }
}
