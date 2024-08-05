import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramHashtagMentionsWebhook } from "@/useCase/@factories/webhook/makeInstagramHashtagMentionsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramHashtagMentionsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);
  console.log("entrou mention");

  const instagramHashtagMentionsWebhookUseCase =
    makeInstagramHashtagMentionsWebhook();

  const data = await instagramHashtagMentionsWebhookUseCase.execute({
    records,
  });

  console.log("saiu mention");

  reply.status(200).send(data);
};
