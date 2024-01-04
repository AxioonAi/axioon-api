import { prisma } from "@/lib/prisma";
import { WebSiteRepository } from "../WebsiteRepository";

export class PrismaWebsiteRepository implements WebSiteRepository {
	async findById(id: string) {
		return await prisma.website.findUnique({
			where: { id },
			include: { city: true },
		});
	}
}
