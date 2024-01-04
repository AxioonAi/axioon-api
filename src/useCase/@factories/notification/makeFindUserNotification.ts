import { PrismaNotificationRepository } from "@/repositories/Prisma/PrismaNotificationRepository";
import { FindUserNotificationUseCase } from "@/useCase/notification/FindUserNotification";

export function makeFindUserNotification() {
	const notificationRepository = new PrismaNotificationRepository();
	return new FindUserNotificationUseCase(notificationRepository);
}
