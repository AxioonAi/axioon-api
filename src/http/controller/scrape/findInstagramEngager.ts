import { makeFindInstagramEngagers } from "@/useCase/@factories/scrape/makeFindInstagramEngagers";
import { FastifyReply, FastifyRequest } from "fastify";

export const findInstagramEngagerController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const findInstagramEngagerUseCase = makeFindInstagramEngagers();

  const { profiles } = await findInstagramEngagerUseCase.execute();

  return reply.status(200).send({ profiles });
};
