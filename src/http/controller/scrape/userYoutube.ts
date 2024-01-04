import { makePoliticianProfileYoutubeChannelList } from "@/useCase/@factories/politicianProfile/makePoliticianProfileYoutubeChannelList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userYoutubeController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const userYoutubeUseCase = makePoliticianProfileYoutubeChannelList();

		const channel = await userYoutubeUseCase.execute({});

		return reply.status(200).send(channel);
	} catch (error) {
		throw error;
	}
};
