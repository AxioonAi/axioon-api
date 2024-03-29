import { ZodAuthenticateUserBodySchema } from "@/lib/zod/user";
import { makeAuthenticateUser } from "@/useCase/@factories/user/makeAuthenticateUser";
import { FastifyReply, FastifyRequest } from "fastify";

export const authenticateUserController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { email, password } = ZodAuthenticateUserBodySchema.parse(request.body);

	const authenticateUser = makeAuthenticateUser();

	const { user } = await authenticateUser.execute({
		email,
		password,
	});

	const token = await reply.jwtSign({
		sub: user.id,
		type: "user",
	});

	const refreshToken = await reply.jwtSign({
		sub: user.id,
		type: "user",
		expiresIn: "7d",
	});

	return reply.status(200).send({
		token,
		refreshToken,
		type: "user",
	});
};
