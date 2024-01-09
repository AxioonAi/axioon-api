import { ZodUpdatePasswordBodySchema } from "@/lib/zod/global";
import { makeUpdateUserPassword } from "@/useCase/@factories/user/makeUpdateUserPassword";
import { FastifyReply, FastifyRequest } from "fastify";

export const updateUserPasswordController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const data = ZodUpdatePasswordBodySchema.parse(request.body);

	const updateUserPasswordUseCase = makeUpdateUserPassword();

	await updateUserPasswordUseCase.execute({
		id: request.user.sub,
		data,
	});

	return reply.status(200).send("Senha alterada com sucesso");
};
