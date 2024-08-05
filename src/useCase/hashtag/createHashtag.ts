import { HashtagMonitoringRepository } from "@/repositories/hashtagMonitoringRepository";
import { HashtagRepository } from "@/repositories/hashtagRepository";
interface createHashtagUseCaseRequest {
  hashtag: string;
  userId: string;
}

interface createHashtagUseCaseResponse {}

export class CreateHashtagUseCase {
  constructor(
    private hashtagRepository: HashtagRepository,
    private hashtagMonitoringRepository: HashtagMonitoringRepository
  ) {}

  async execute({
    hashtag,
    userId,
  }: createHashtagUseCaseRequest): Promise<createHashtagUseCaseResponse> {
    const hashtagAlreadyExists = await this.hashtagRepository.findByHashtag(
      hashtag
    );

    if (hashtagAlreadyExists) {
      const monitoringAlreadyExists =
        await this.hashtagMonitoringRepository.findByUserIdAndHashtagId({
          hashtag_id: hashtagAlreadyExists.id,
          user_id: userId,
        });

      if (!monitoringAlreadyExists) {
        await this.hashtagMonitoringRepository.create({
          hashtag_id: hashtagAlreadyExists.id,
          user_id: userId,
        });
      }

      return {};
    }

    const hashtagCreated = await this.hashtagRepository.create({
      hashtag,
    });

    await this.hashtagMonitoringRepository.create({
      hashtag_id: hashtagCreated.id,
      user_id: userId,
    });

    return {};
  }
}
