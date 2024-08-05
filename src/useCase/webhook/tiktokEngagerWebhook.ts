import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { TiktokEngagerRepository } from "@/repositories/TiktokEngagerRepository";

interface TiktokEngagerWebhookUseCaseRequest {
  records: string;
}

export class TiktokEngagerWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private tiktokEngagerRepository: TiktokEngagerRepository
  ) {}

  async execute({
    records,
  }: TiktokEngagerWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3TiktokEngagerNotification({
        records,
      });

    await this.tiktokEngagerRepository.updateMany(data);

    return;
  }
}
