import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramCommentsWebhook } from "@/useCase/@factories/webhook/makeInstagramCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramCommentsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);
  console.log("entrou instagram comments");

  const instagramCommentsWebhookUseCase = makeInstagramCommentsWebhook();

  const data = await instagramCommentsWebhookUseCase.execute({
    records,
  });

  console.log("saiu instagram comments");

  reply.status(200).send(data);
};
