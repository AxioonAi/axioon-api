import { makeUserInstagramList } from "@/useCase/@factories/user/makeUserInstagramList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userInstagramController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userInstagramUseCase = makeUserInstagramList();

    const instagram = await userInstagramUseCase.execute({});

    return reply.status(200).send(instagram);
  } catch (error) {
    throw error;
  }
};
