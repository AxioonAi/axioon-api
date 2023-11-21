import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { TiktokBaseDataRepository } from "@/repositories/TiktokBaseDataRepository";
import { TiktokVideoDataRepository } from "@/repositories/TiktokVideoDataRepository";

interface TiktokProfileWebhookUseCaseRequest {
  records: {
    s3: {
      object: {
        key: string;
      };
    };
  }[];
}

interface TiktokProfileWebhookUseCaseResponse {}

export class TiktokProfileWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private tiktokBaseDataRepository: TiktokBaseDataRepository,
    private tiktokVideoDataRepository: TiktokVideoDataRepository
  ) {}

  async execute({
    records,
  }: TiktokProfileWebhookUseCaseRequest): Promise<TiktokProfileWebhookUseCaseResponse> {
    const data =
      await this.awsNotificationRepository.S3TiktokProfileNotification({
        records,
      });

    await Promise.all([
      this.tiktokBaseDataRepository.createMany(data.profileData),
      this.tiktokVideoDataRepository.createMany(data.videoData),
    ]);

    return data;
  }
}
