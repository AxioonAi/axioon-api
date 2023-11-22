import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookProfileWebhook } from "@/useCase/@factories/webhook/makeFacebookProfileWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookProfileWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { Records } = ZodWebhookBodySchema.parse(request.body);

  try {
    const facebookWebhookUseCase = makeFacebookProfileWebhook();
    const data = await facebookWebhookUseCase.execute({
      records: Records,
    });

    return reply.status(200).send(data);
  } catch (error) {
    throw error;
  }
};
