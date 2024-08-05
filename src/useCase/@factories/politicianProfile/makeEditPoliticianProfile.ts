import { PrismaPoliticianProfileRepository } from "@/repositories/Prisma/PrismaPoliticianProfileRepository";
import { EditPoliticianProfileUseCase } from "@/useCase/politicianProfile/EditPoliticianProfile";

export function makeEditPoliticianProfile() {
  const politicianProfileRepository = new PrismaPoliticianProfileRepository();

  return new EditPoliticianProfileUseCase(politicianProfileRepository);
}
