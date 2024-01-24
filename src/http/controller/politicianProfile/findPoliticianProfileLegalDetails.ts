import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeFindPoliticianProfileLegalDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileLegalDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileLegalDetailsController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);

	const findPoliticianProfileLegalDetailsUseCase =
		makeFindPoliticianProfileLegalDetails();

	const { politicianProfile } =
		await findPoliticianProfileLegalDetailsUseCase.execute({
			id,
		});

	return reply.status(200).send({ politicianProfile });
};
