import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileWithCpfUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileWithCpf";

export function makeFindPoliticianProfileByCpf() {
	const politicianProfileRepository = new PrismaPoliticianProfileRepository();
	return new FindPoliticianProfileWithCpfUseCase(politicianProfileRepository);
}
