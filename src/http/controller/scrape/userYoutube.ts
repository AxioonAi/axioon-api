import { makePoliticianProfileYoutubeChannelList } from "@/useCase/@factories/scrape/makePoliticianProfileYoutubeChannelList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userYoutubeController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const userYoutubeUseCase = makePoliticianProfileYoutubeChannelList();

	const channel = await userYoutubeUseCase.execute({});

	return reply.status(200).send(channel);
};
