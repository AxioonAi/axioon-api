import { prisma } from "@/lib/prisma";
import { SignaturePlanRepository } from "../SignaturePlanRepository";

export class PrismaSignaturePlanRepository implements SignaturePlanRepository {
	async findById(id: string) {
		return await prisma.signaturePlan.findUnique({
			where: {
				id,
			},
		});
	}

	async findAll() {
		return await prisma.signaturePlan.findMany();
	}
}
