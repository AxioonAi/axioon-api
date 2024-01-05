import { makePoliticianProfileInstagramList } from "@/useCase/@factories/politicianProfile/makePoliticianProfileInstagramList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userInstagramController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const userInstagramUseCase = makePoliticianProfileInstagramList();

	const instagram = await userInstagramUseCase.execute({});

	return reply.status(200).send(instagram);
};
