import { makeFindPoliticianProfileFacebookList } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileFacebookList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userFacebookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userFacebookUseCase = makeFindPoliticianProfileFacebookList();

    const facebook = await userFacebookUseCase.execute({});

    return reply.status(200).send(facebook);
  } catch (error) {
    throw error;
  }
};
