import { makeFindTutorialVideos } from "@/useCase/@factories/tutorialVideo/makeFindTutorialVideos";
import { FastifyReply, FastifyRequest } from "fastify";

export const findManyTutorialController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const findManyTutorialUseCase = makeFindTutorialVideos();

	const videos = await findManyTutorialUseCase.execute({});

	return reply.status(200).send(videos);
};
