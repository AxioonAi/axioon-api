import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeUserSignatureValidation } from "@/useCase/@factories/user/makeUserSignatureValidation";
import { FastifyReply, FastifyRequest } from "fastify";

export const userSignatureValidationController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);

	const UserSignatureValidation = makeUserSignatureValidation();

	await UserSignatureValidation.execute({
		id: request.user.sub,
		type: id,
	});

	return reply.status(200).send();
};
