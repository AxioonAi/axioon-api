import { makeFindProfileWithoutFacebookData } from "@/useCase/@factories/scrape/makeFindProfileWithoutFacebookData";
import { FastifyReply, FastifyRequest } from "fastify";

export const findProfileWithoutFacebookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const findProfileWithoutFacebookUseCase =
		makeFindProfileWithoutFacebookData();

	const { profiles } = await findProfileWithoutFacebookUseCase.execute();

	return reply.status(200).send({ profiles });
};
