import { makeUserYoutubeChannel } from "@/useCase/@factories/user/makeUserYoutubeChannel";
import { FastifyReply, FastifyRequest } from "fastify";

export const userYoutubeController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userYoutubeUseCase = makeUserYoutubeChannel();

    const channel = await userYoutubeUseCase.execute({});

    return reply.status(200).send(channel);
  } catch (error) {
    throw error;
  }
};
