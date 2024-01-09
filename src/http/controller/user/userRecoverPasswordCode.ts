import { ZodRecoverPasswordCodeBodySchema } from "@/lib/zod/global";
import { makeUserRecoverPasswordCode } from "@/useCase/@factories/user/makeUserRecoverPasswordCode";
import { FastifyReply, FastifyRequest } from "fastify";

export const userRecoverPasswordCodeController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { email } = ZodRecoverPasswordCodeBodySchema.parse(request.body);

	const userRecoverPasswordCode = makeUserRecoverPasswordCode();

	const code = await userRecoverPasswordCode.execute({
		email,
	});

	return reply.status(200).send({ code });
};
