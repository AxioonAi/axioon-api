import { makeFindPoliticianNames } from "@/useCase/@factories/politicianProfile/makeFindPoliticianNames";
import { FastifyReply, FastifyRequest } from "fastify";

export const userNameController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userNameUseCase = makeFindPoliticianNames();

    const data = await userNameUseCase.execute({});

    return reply.status(200).send(data);
  } catch (error) {
    throw error;
  }
};
