import { ZodCreateAiChatSchema } from "@/lib/zod/aiChat";
import { makeCreateAiChat } from "@/useCase/@factories/aiChat/makeCreateAiChat";
import { FastifyReply, FastifyRequest } from "fastify";

export const createChatController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = ZodCreateAiChatSchema.parse(request.body);

  const createAiChatUseCase = makeCreateAiChat();

  const { chat } = await createAiChatUseCase.execute({
    ...data,
    userId: request.user.sub,
  });

  console.log(chat);
  return reply.status(201).send({ chat });
};
