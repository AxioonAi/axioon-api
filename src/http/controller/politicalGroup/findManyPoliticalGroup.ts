import { makeFindManyPoliticalGroup } from "@/useCase/@factories/politicalGroup/makeFindManyPoliticalGroup";
import { FastifyReply, FastifyRequest } from "fastify";

export const findManyPoliticalGroupController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const findManyPoliticalGroupUseCase = makeFindManyPoliticalGroup();

  const politicalGroup = await findManyPoliticalGroupUseCase.execute();

  return reply.status(200).send(politicalGroup);
};
