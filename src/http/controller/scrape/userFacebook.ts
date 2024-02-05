import { makeFindPoliticianProfileFacebookList } from "@/useCase/@factories/scrape/makeFindPoliticianProfileFacebookList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userFacebookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const userFacebookUseCase = makeFindPoliticianProfileFacebookList();

	const facebook = await userFacebookUseCase.execute({});

	return reply.status(200).send(facebook);
};
