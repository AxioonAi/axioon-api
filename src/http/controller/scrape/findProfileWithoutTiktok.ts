import { makeFindProfileWithoutTiktokData } from "@/useCase/@factories/scrape/makeFindProfileWithoutTiktokData";
import { FastifyReply, FastifyRequest } from "fastify";

export const findProfileWithoutTiktokController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const findProfileWithoutTiktokUseCase = makeFindProfileWithoutTiktokData();

	const { profiles } = await findProfileWithoutTiktokUseCase.execute();

	return reply.status(200).send({ profiles });
};
