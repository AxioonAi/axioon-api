import { ZodCreateMessageSchema } from "@/lib/zod/aiChat";
import { makeCreateAiMessage } from "@/useCase/@factories/aiChat/makeCreateAiMessage";
import { FastifyReply, FastifyRequest } from "fastify";

export const createMessageController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = ZodCreateMessageSchema.parse(request.body);

  const createMessageUseCase = makeCreateAiMessage();

  await createMessageUseCase.execute({
    ...data,
    userId: request.user.sub,
  });

  return reply.status(201).send({});
};
