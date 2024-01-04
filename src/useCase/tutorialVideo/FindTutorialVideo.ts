import { TutorialVideoRepository } from "@/repositories/TutorialVideoRepository";
import { tutorialVideo } from "@prisma/client";

interface FindTutorialVideoUseCaseResponse {
	videos: tutorialVideo[];
}

export class FindTutorialVideoUseCase {
	constructor(private tutorialVideoRepository: TutorialVideoRepository) {}

	async execute(): Promise<FindTutorialVideoUseCaseResponse> {
		const tutorialVideo = await this.tutorialVideoRepository.findAll();

		return {
			videos: tutorialVideo,
		};
	}
}
