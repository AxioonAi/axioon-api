import { makeFindProfileWithoutInstagramData } from "@/useCase/@factories/scrape/makeFindProfileWithoutInstagramData";
import { FastifyReply, FastifyRequest } from "fastify";

export const findProfileWithoutInstagramController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const findProfileWithoutInstagramUseCase =
		makeFindProfileWithoutInstagramData();

	const { profiles } = await findProfileWithoutInstagramUseCase.execute();

	return reply.status(200).send({ profiles });
};
