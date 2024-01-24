import { makeFindManySignaturePlans } from "@/useCase/@factories/signaturePlan/makeFindManySignaturePlans";
import { FastifyReply, FastifyRequest } from "fastify";

export const findManySignaturePlansController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const findManySignaturePlansUseCase = makeFindManySignaturePlans();
	const plans = await findManySignaturePlansUseCase.execute({});




	return reply.status(200).send(plans);


};
