import { makeFindPoliticianNames } from "@/useCase/@factories/scrape/makeFindPoliticianNames";
import { FastifyReply, FastifyRequest } from "fastify";

export const userNameController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const userNameUseCase = makeFindPoliticianNames();

	const data = await userNameUseCase.execute({});

	return reply.status(200).send(data);
};
