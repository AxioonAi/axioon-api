import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeFindPoliticianProfileAdvertisingDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileAdvertisingDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileAdvertisingDetailsController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);

	const findPoliticianProfileAdvertisingDetailsUseCase =
		makeFindPoliticianProfileAdvertisingDetails();

	const data = await findPoliticianProfileAdvertisingDetailsUseCase.execute({
		id,
		userId: request.user.sub,
	});

	return reply.status(200).send(data);
};
