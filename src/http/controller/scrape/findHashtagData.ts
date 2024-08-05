import { makeFindHashtagData } from "@/useCase/@factories/scrape/makeFindHashtagData";
import { FastifyReply, FastifyRequest } from "fastify";

export const findHashtagDataController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const findHashtagData = makeFindHashtagData();

  const { list } = await findHashtagData.execute();

  return reply.status(200).send(list);
};
