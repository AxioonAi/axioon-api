import { PoliticalGroupRepository } from "@/repositories/PoliticalGroupRepository";
import { PoliticalGroup } from "@prisma/client";

interface FindManyPoliticalGroupUseCaseResponse {
	politicalGroup: PoliticalGroup[];
}

export class FindManyPoliticalGroupUseCase {
	constructor(private politicalGroupRepository: PoliticalGroupRepository) {}

	async execute(): Promise<FindManyPoliticalGroupUseCaseResponse> {
		const politicalGroup = await this.politicalGroupRepository.findMany();

		return {
			politicalGroup,
		};
	}
}
