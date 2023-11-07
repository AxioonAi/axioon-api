import { makeUserFacebookList } from "@/useCase/@factories/user/makeUserFacebookList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userFacebookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userFacebookUseCase = makeUserFacebookList();

    const facebook = await userFacebookUseCase.execute({});

    return reply.status(200).send(facebook);
  } catch (error) {
    throw error;
  }
};
