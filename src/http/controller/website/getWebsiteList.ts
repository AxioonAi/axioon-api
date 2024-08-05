import { makeGetWebsiteList } from "@/useCase/@factories/website/makeGetWebsiteList";
import { FastifyReply, FastifyRequest } from "fastify";

export const getWebsiteListController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getWebsiteListUseCase = makeGetWebsiteList();

  const websites = await getWebsiteListUseCase.execute();

  return reply.status(200).send(websites);
};
