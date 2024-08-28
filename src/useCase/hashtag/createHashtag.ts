import { HashtagMonitoringRepository } from "@/repositories/hashtagMonitoringRepository";
import { HashtagRepository } from "@/repositories/hashtagRepository";
interface createHashtagUseCaseRequest {
  hashtags: string[];
  userId: string;
}

interface createHashtagUseCaseResponse {}

export class CreateHashtagUseCase {
  constructor(
    private hashtagRepository: HashtagRepository,
    private hashtagMonitoringRepository: HashtagMonitoringRepository
  ) {}

  async execute({
    hashtags,
    userId,
  }: createHashtagUseCaseRequest): Promise<createHashtagUseCaseResponse> {
    for (const hashtag of hashtags) {
      const cleanHashtag = hashtag.replace("#", "").replace(" ", "");

      const hashtagAlreadyExists = await this.hashtagRepository.findByHashtag(
        cleanHashtag
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
        hashtag: cleanHashtag,
      });

      await this.hashtagMonitoringRepository.create({
        hashtag_id: hashtagCreated.id,
        user_id: userId,
      });
    }

    return {};
  }
}
