import { Notification, NotificationType } from "@prisma/client";

export interface NotificationRepository {
	create(data: {
		description: string;
		user_id: string;
		politician_profile_id: string;
		type: NotificationType;
	}): Promise<void>;
	createMany(
		data: {
			description: string;
			user_id: string;
			politician_profile_id: string;
			type: NotificationType;
		}[],
	): Promise<void>;
	findUserNotification(userId: string): Promise<Notification[]>;
	update(id: string, opened: boolean): Promise<void>;
}
