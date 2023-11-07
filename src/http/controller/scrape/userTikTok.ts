import { makeUserTikTokList } from "@/useCase/@factories/user/makeUserTikTokList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userTikTokController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userTikTokUseCase = makeUserTikTokList();

    const tiktok = await userTikTokUseCase.execute({});

    return reply.status(200).send(tiktok);
  } catch (error) {
    throw error;
  }
};
