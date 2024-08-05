import { makeGetUserChats } from "@/useCase/@factories/aiChat/makeGetUserChats";
import { FastifyReply, FastifyRequest } from "fastify";

export const getUserChatController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getUserChat = makeGetUserChats();

  const { chat } = await getUserChat.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ chatList: chat });
};
