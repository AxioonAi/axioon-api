import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookWebhook } from "@/useCase/@factories/webhook/makeFacebookWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { Records } = ZodWebhookBodySchema.parse(request.body);

  try {
    const facebookWebhookUseCase = makeFacebookWebhook();
    const data = await facebookWebhookUseCase.execute({
      records: Records,
    });

    return reply.status(200).send(data);
  } catch (error) {
    throw error;
  }
};
