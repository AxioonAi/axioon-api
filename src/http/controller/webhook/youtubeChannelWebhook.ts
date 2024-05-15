import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeYoutubeChannelWebhook } from "@/useCase/@factories/webhook/makeYoutubeChannelWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const youtubeChannelWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);
  const youtubeChannelWebhookUseCase = makeYoutubeChannelWebhook();

  console.log("entrou youtube channel");
  const data = await youtubeChannelWebhookUseCase.execute({
    records,
  });

  console.log("saiu youtube channel");
  reply.status(200).send(data);
};
