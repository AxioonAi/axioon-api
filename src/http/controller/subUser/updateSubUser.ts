import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodUpdateSubUserBodySchema } from "@/lib/zod/subUser";
import { makeUpdateSubUser } from "@/useCase/@factories/subUser/makeUpdateSubUser";
import { FastifyReply, FastifyRequest } from "fastify";

export const updateSubUserController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);
	const data = ZodUpdateSubUserBodySchema.parse(request.body);
	try {
		const updateSubUserUseCase = makeUpdateSubUser();

		await updateSubUserUseCase.execute({
			...data,
			subUserId: id,
			userId: request.user.sub,
		});

		return reply.status(200).send();
	} catch (error) {}
};
