import { makeUserProfile } from "@/useCase/@factories/user/makeUserProfile";
import { FastifyReply, FastifyRequest } from "fastify";

export const userProfileController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const userProfileUseCase = makeUserProfile();

	const { user } = await userProfileUseCase.execute({
		id: request.user.sub,
	});

	return reply.status(200).send({
		user,
	});
};
