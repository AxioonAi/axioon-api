import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramHashtagMentionsCommentsWebhook } from "@/useCase/@factories/webhook/makeInstagramHashtagMentionsCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramHashtagMentionCommentsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);

  console.log("entrou mention comments");

  const instagramHashtagMentionCommentsWebhookUseCase =
    makeInstagramHashtagMentionsCommentsWebhook();

  const data = await instagramHashtagMentionCommentsWebhookUseCase.execute({
    records,
  });
  console.log("saiu mention comments");

  return reply.status(200).send(data);
};
