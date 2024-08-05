import { AwsNotificationRepository } from "@/repositories/AwsNotificationRepository";
import { InstagramBaseDataRepository } from "@/repositories/InstagramBaseDataRepository";
import { NotificationRepository } from "@/repositories/NotificationRepository";
import { InstagramEngagerRepository } from "@/repositories/instagramEngagerRepository";
import { NotificationType } from "@prisma/client";

interface InstagramEngagerWebhookUseCaseRequest {
  records: string;
}

export class InstagramEngagerWebhookUseCase {
  constructor(
    private awsNotificationRepository: AwsNotificationRepository,
    private instagramBaseDataRepository: InstagramEngagerRepository
  ) {}

  async execute({
    records,
  }: InstagramEngagerWebhookUseCaseRequest): Promise<void> {
    const data =
      await this.awsNotificationRepository.S3InstagramEngagerNotification({
        records,
      });

    await this.instagramBaseDataRepository.updateMany(data);

    return;
  }
}
