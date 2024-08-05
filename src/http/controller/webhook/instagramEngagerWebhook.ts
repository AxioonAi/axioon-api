import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramEngagerWebhook } from "@/useCase/@factories/webhook/makeInstagramEngagerWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramEngagerWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);

  const instagramEngagerWebhookUseCase = makeInstagramEngagerWebhook();

  const data = await instagramEngagerWebhookUseCase.execute({
    records,
  });

  reply.status(200).send(data);
};
