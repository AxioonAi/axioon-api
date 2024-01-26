import { ZodCreatePoliticianProfileBodySchema } from "@/lib/zod/politicianProfile";
import { makePoliticianProfileExists } from "@/useCase/@factories/politicianProfile/makePoliticianProfileExists";
import { FastifyReply, FastifyRequest } from "fastify";

export const politicianProfileExistsController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const data = ZodCreatePoliticianProfileBodySchema.parse(request.body);

	const politicianProfileExistsUseCase = makePoliticianProfileExists();

	const { profile } = await politicianProfileExistsUseCase.execute({
		data: {
			...data,
			user_id: request.user.sub,
		},
	});

	return reply.status(200).send({ profile });
};
