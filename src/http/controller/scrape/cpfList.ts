import { makeFindCpfList } from "@/useCase/@factories/politicianProfile/makeFindCpfList";
import { FastifyReply, FastifyRequest } from "fastify";

export const cpfListController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const cpfListUseCase = makeFindCpfList();

	const { profiles } = await cpfListUseCase.execute();

	return reply.status(200).send(profiles);
};
