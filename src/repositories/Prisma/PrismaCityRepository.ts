import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CityRepository } from "../CityRepository";

export class PrismaCityRepository implements CityRepository {
	async findById(id: string) {
		return await prisma.city.findUnique({
			where: {
				id,
			},
		});
	}

	async findByNameAndState(name: string, state: string) {
		return await prisma.city.findFirst({
			where: {
				name,
				state,
			},
		});
	}

	async create(data: Prisma.CityCreateInput) {
		return await prisma.city.create({
			data,
		});
	}
}
