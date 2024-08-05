import { makeGetHashtagList } from "@/useCase/@factories/hashtag/makeGetHashtagList";
import { FastifyReply, FastifyRequest } from "fastify";

export const getHashtagListController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getHashtagListUseCase = makeGetHashtagList();

  const hashtags = await getHashtagListUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send(hashtags);
};
