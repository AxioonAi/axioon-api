import { prisma } from "@/lib/prisma";
import { NotificationType } from "@prisma/client";
import { NotificationRepository } from "../NotificationRepository";

export class PrismaNotificationRepository implements NotificationRepository {
	async create(data: {
		description: string;
		user_id: string;
		politician_profile_id: string;
		type: NotificationType;
	}) {
		await prisma.notification.create({
			data,
		});
	}

	async findUserNotification(userId: string) {
		return await prisma.notification.findMany({
			where: {
				user_id: userId,
			},
		});
	}

	async update(id: string, opened: boolean) {
		await prisma.notification.update({
			where: {
				id,
			},
			data: {
				opened,
			},
		});
	}

	async createMany(
		data: {
			description: string;
			user_id: string;
			politician_profile_id: string;
			type: NotificationType;
		}[],
	) {
		await prisma.notification.createMany({
			data,
		});

		return;
	}
}
