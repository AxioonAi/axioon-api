import { makeSubUserList } from "@/useCase/@factories/subUser/makeSubUserList";
import { FastifyReply, FastifyRequest } from "fastify";

export const subUserListController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const subUserListUseCase = makeSubUserList();

	const users = await subUserListUseCase.execute({
		userId: request.user.sub,
	});

	return reply.status(200).send(users);
};
