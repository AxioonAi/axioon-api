import { PrismaTutorialVideoRepository } from "@/repositories/Prisma/PrismaTutorialVideoRepository";
import { FindTutorialVideoUseCase } from "@/useCase/tutorialVideo/FindTutorialVideo";

export function makeFindTutorialVideos() {
	const tutorialVideoRepository = new PrismaTutorialVideoRepository();
	return new FindTutorialVideoUseCase(tutorialVideoRepository);
}
