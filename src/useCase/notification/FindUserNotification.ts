import { NotificationRepository } from "@/repositories/NotificationRepository";
import { Notification } from "@prisma/client";

interface FindUserNotificationUseCaseRequest {
	id: string;
}

interface FindUserNotificationUseCaseResponse {
	notification: Notification[];
}

export class FindUserNotificationUseCase {
	constructor(private notificationRepository: NotificationRepository) {}

	async execute({
		id,
	}: FindUserNotificationUseCaseRequest): Promise<FindUserNotificationUseCaseResponse> {
		const notification =
			await this.notificationRepository.findUserNotification(id);

		return {
			notification,
		};
	}
}
