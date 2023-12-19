import { NotificationRepository } from "@/repositories/NotificationRepository";

interface FindUserNotificationUseCaseRequest {
  id: string;
}

interface FindUserNotificationUseCaseResponse {}

export class FindUserNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    id,
  }: FindUserNotificationUseCaseRequest): Promise<FindUserNotificationUseCaseResponse> {
    const notification = await this.notificationRepository.findUserNotification(
      id
    );

    return {
      notification,
    };
  }
}
