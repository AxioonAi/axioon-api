import { makeFindProfileWithoutLegalData } from "@/useCase/@factories/scrape/makeFindProfileWithoutLegalData";
import { FastifyReply, FastifyRequest } from "fastify";

export const findProfileWithoutLegalController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const findProfileWithoutLegalUseCase = makeFindProfileWithoutLegalData();

	const { profiles } = await findProfileWithoutLegalUseCase.execute();

	return reply.status(200).send({ profiles });
};
