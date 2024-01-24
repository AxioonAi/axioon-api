import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { FindPoliticianProfileLegalDetailsUseCase } from "@/useCase/politicianProfile/FindPoliticianProfileLegalDetails";

export function makeFindPoliticianProfileLegalDetails(){
    const politicianProfileRepository = new PrismaPoliticianProfileRepository();
    return new FindPoliticianProfileLegalDetailsUseCase(politicianProfileRepository)
}