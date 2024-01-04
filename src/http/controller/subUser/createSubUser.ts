import { ZodCreateSubUserBodySchema } from "@/lib/zod/subUser";
import { makeCreateSubUser } from "@/useCase/@factories/subUser/makeCreateSubUser";
import { FastifyReply, FastifyRequest } from "fastify";

export const createSubUserController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const data = ZodCreateSubUserBodySchema.parse(request.body);

	try {
		const createSubUserUseCase = makeCreateSubUser();

		const user = await createSubUserUseCase.execute({
			data: {
				...data,
				user_id: request.user.sub,
			},
		});

		return reply.status(201).send({});
	} catch (error) {
		throw error;
	}
};
