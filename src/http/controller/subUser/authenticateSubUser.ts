import { ZodAuthenticateUserBodySchema } from "@/lib/zod/user";
import { makeAuthenticateSubUser } from "@/useCase/@factories/subUser/makeAuthenticateSubUser";
import { FastifyReply, FastifyRequest } from "fastify";

export const authenticateSubUserController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const data = ZodAuthenticateUserBodySchema.parse(request.body);

	const authenticateSubUser = makeAuthenticateSubUser();

	const { user } = await authenticateSubUser.execute({
		email: data.email,
		password: data.password,
	});

	const token = await reply.jwtSign({
		sub: user.user_id,
		type: "subUser",
		sub_user_id: user.id,
	});

	const refreshToken = await reply.jwtSign({
		sub: user.id,
		type: "subUser",
		sub_user_id: user.id,
		expiresIn: "7d",
	});

	return reply.status(200).send({
		token,
		refreshToken,
		type: "subUser",
	});
};
