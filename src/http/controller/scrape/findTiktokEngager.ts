import { makeFindTiktokEngagers } from "@/useCase/@factories/scrape/makeFindTiktokEngagers";
import { FastifyReply, FastifyRequest } from "fastify";

export const findTiktokEngagerController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const findTiktokEngagerUseCase = makeFindTiktokEngagers();

  const { profiles } = await findTiktokEngagerUseCase.execute();

  return reply.status(200).send({ profiles });
};
