import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeFindProfileWithoutNews } from "@/useCase/@factories/politicianProfile/makeFindProfileWithoutNews";
import { FastifyReply, FastifyRequest } from "fastify";

export const findProfileWithoutNewsController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);

	const findProfileWithoutNewsUseCase = makeFindProfileWithoutNews();

	const users = await findProfileWithoutNewsUseCase.execute({
		id,
	});

	return reply.status(200).send(users);
};
