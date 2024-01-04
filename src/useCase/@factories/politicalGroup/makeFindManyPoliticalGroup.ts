import { PrismaPoliticalGroupRepository } from "@/repositories/Prisma/PrismaPoliticalGroupRepository";
import { FindManyPoliticalGroupUseCase } from "@/useCase/politicalGroup/FindManyPoliticalGroup";

export function makeFindManyPoliticalGroup() {
	const politicalGroupRepository = new PrismaPoliticalGroupRepository();
	return new FindManyPoliticalGroupUseCase(politicalGroupRepository);
}
