import { TutorialVideoRepository } from "@/repositories/TutorialVideoRepository";

interface FindTutorialVideoUseCaseRequest {}

interface FindTutorialVideoUseCaseResponse {}

export class FindTutorialVideoUseCase {
	constructor(private tutorialVideoRepository: TutorialVideoRepository) {}

	async execute({}: FindTutorialVideoUseCaseRequest): Promise<FindTutorialVideoUseCaseResponse> {
		const tutorialVideo = await this.tutorialVideoRepository.findAll();

		return {
			videos: tutorialVideo,
		};
	}
}
