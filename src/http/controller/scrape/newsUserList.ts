import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeFindWebsiteUsers } from "@/useCase/@factories/scrape/makeFindWebsiteUsers";
import { FastifyReply, FastifyRequest } from "fastify";

export const newsUserListController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);

	const websiteUserList = makeFindWebsiteUsers();

	const users = await websiteUserList.execute({
		id,
	});

	return reply.status(200).send(users);
};
