import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeTiktokHashtagMentionCommentWebhook } from "@/useCase/@factories/webhook/makeTiktokHashtagMentionCommentWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const tiktokHashtagMentionsCommentWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);

  const tiktokHashtagMentionsCommentWebhookUseCase =
    makeTiktokHashtagMentionCommentWebhook();

  const data = await tiktokHashtagMentionsCommentWebhookUseCase.execute({
    records,
  });

  return reply.status(200).send(data);
};
