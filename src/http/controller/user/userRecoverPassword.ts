import { ZodRecoverPasswordBodySchema } from "@/lib/zod/global";
import { makeUserRecoverPassword } from "@/useCase/@factories/user/makeUserRecoverPassword";
import { FastifyReply, FastifyRequest } from "fastify";

export const userRecoverPasswordController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const data = ZodRecoverPasswordBodySchema.parse(request.body);

	const userRecoverPasswordUseCase = makeUserRecoverPassword();

	await userRecoverPasswordUseCase.execute({
		data,
	});

	return reply.status(200).send("Senha alterada com sucesso");
};
