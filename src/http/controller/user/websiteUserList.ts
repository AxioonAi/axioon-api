import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeUserWebsiteList } from "@/useCase/@factories/user/makeUserWebsiteList";
import { FastifyReply, FastifyRequest } from "fastify";

export const websiteUserListController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  try {
    const websiteUserList = makeUserWebsiteList();

    const { users } = await websiteUserList.execute({
      websiteId: id,
    });

    reply.send({ users });
  } catch (error) {
    throw error;
  }
};
