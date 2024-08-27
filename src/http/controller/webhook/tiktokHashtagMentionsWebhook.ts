import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeTiktokHashtagMentionsWebhook } from "@/useCase/@factories/webhook/makeTiktokHashtagMentionsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const tiktokHashtagMentionsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);

  console.log("entrou tiktok hashtag mentions");

  const tiktokHashtagMentionsWebhookUseCase =
    makeTiktokHashtagMentionsWebhook();

  const data = await tiktokHashtagMentionsWebhookUseCase.execute({
    records,
  });

  console.log("saiu tiktok hashtag mentions");

  return reply.status(200).send(data);
};
