import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshTokenController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const token = await reply.jwtSign({
		sub: request.user.sub,
	});

	const refreshToken = await reply.jwtSign({
		sub: request.user.sub,
		expiresIn: "7d",
	});
	return reply.status(200).send({
		token,
		refreshToken,
		type: request.user.type,
	});
}
