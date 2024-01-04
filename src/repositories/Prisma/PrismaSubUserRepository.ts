import { prisma } from "@/lib/prisma";
import { SubUserRepository } from "../SubUserRepository";

export class PrismaSubUserRepository implements SubUserRepository {
	async findById(id: string) {
		return await prisma.subUser.findUnique({
			where: {
				id,
			},
		});
	}
	async findByEmail(email: string) {
		return await prisma.subUser.findFirst({
			where: {
				email,
			},
		});
	}

	async findByUserId(userId: string) {
		return await prisma.subUser.findMany({
			where: {
				user_id: userId,
			},
		});
	}

	async create(data: {
		name: string;
		email: string;
		password_hash: string;
		user_id: string;
	}) {
		return await prisma.subUser.create({
			data: {
				...data,
				active: true,
			},
		});
	}

	async update(id: string, data: { password_hash?: string; active?: boolean }) {
		return await prisma.subUser.update({
			where: {
				id,
			},
			data,
		});
	}
}
