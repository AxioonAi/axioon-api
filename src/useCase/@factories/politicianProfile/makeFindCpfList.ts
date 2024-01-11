import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindCpfListUseCase } from "@/useCase/politicianProfile/FindCpfList";

export function makeFindCpfList() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindCpfListUseCase(politicianProfileRepository);
}
