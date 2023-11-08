import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeYoutubeWebhook } from "@/useCase/@factories/webhook/makeYoutubeWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const youtubeWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { Records } = ZodWebhookBodySchema.parse(request.body);

  try {
    const youtubeWebhookUseCase = makeYoutubeWebhook();

    const data = await youtubeWebhookUseCase.execute({
      records: Records,
    });

    reply.status(200).send(data);
  } catch (error) {
    throw error;
  }
};
