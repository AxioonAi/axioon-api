import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramMentionsWebhook } from "@/useCase/@factories/webhook/makeInstagramMentionsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramMentionsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);
  console.log("entrou mention");

  const instagramMentionsWebhookUseCase = makeInstagramMentionsWebhook();

  const data = await instagramMentionsWebhookUseCase.execute({
    records,
  });

  console.log("saiu mention");

  reply.status(200).send(data);
};
