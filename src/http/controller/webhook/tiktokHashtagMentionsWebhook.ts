import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeTiktokHashtagMentionsWebhook } from "@/useCase/@factories/webhook/makeTiktokHashtagMentionsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const tiktokHashtagMentionsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);

  const tiktokHashtagMentionsWebhookUseCase =
    makeTiktokHashtagMentionsWebhook();

  const data = await tiktokHashtagMentionsWebhookUseCase.execute({
    records,
  });

  return reply.status(200).send(data);
};
