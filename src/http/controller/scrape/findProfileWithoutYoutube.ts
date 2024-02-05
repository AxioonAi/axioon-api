import { makeFindProfileWithoutYoutubeData } from "@/useCase/@factories/scrape/makeFindProfileWithoutYoutubeData";
import { FastifyReply, FastifyRequest } from "fastify";

export const findProfileWithoutYoutubeController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const findProfileWithoutYoutubeUseCase = makeFindProfileWithoutYoutubeData();

	const { profiles } = await findProfileWithoutYoutubeUseCase.execute();

	return reply.status(200).send({ profiles });
};
