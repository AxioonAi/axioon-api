import { prisma } from "@/lib/prisma";
import moment from "moment";
import { UserRecoverPasswordCodeRepository } from "../UserRecoverPasswordCodeRepository";

export class PrismaUserRecoverPasswordCodeRepository
	implements UserRecoverPasswordCodeRepository
{
	async create(data: { user_id: string; code: string }) {
		await prisma.userRecoverPasswordCode.createMany({
			data: {
				...data,
				expires_in: moment().add(15, "minutes").toDate(),
			},
		});
	}

	async findByCode(code: string) {
		return await prisma.userRecoverPasswordCode.findFirst({
			where: {
				code,
				expires_in: {
					gte: moment().toDate(),
				},
			},
		});
	}
}
