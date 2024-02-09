import { WebsiteNotFoundError } from "@/helper/errors/WebsiteNotFoundError";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { WebSiteRepository } from "@/repositories/WebsiteRepository";
import { NewsUsers } from "@prisma/client";

interface FindProfileWithoutNewsUseCaseRequest {
	id: string;
}

interface FindProfileWithoutNewsUseCaseResponse {
	users: {
		id: string;
		social_name: string;
		news: NewsUsers[];
	}[];
}

export class FindProfileWithoutNewsUseCase {
	constructor(
		private politicianProfileRepository: PoliticianProfileRepository,
		private websiteRepository: WebSiteRepository,
	) {}

	async execute({
		id,
	}: FindProfileWithoutNewsUseCaseRequest): Promise<FindProfileWithoutNewsUseCaseResponse> {
		const website = await this.websiteRepository.findById(id);

		if (!website) throw new WebsiteNotFoundError();

		const users = await this.politicianProfileRepository.findProfileWithoutNews(
			website.city.state,
		);

		return { users: users.filter((profile) => profile.news.length === 0) };
	}
}
