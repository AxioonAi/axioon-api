import { makeGetInitialLegalData } from "@/useCase/@factories/legalData/makeGetInitialLegalData";
import { FastifyReply, FastifyRequest } from "fastify";

export const getInitialLegalDataController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getInitialLegalDataUseCase = makeGetInitialLegalData();

  await getInitialLegalDataUseCase.execute();

  return reply.status(201).send({});
};
