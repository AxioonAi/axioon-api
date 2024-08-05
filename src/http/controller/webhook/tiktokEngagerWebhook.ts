import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeTiktokEngagersWebhook } from "@/useCase/@factories/webhook/makeTiktokEngagersWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const tiktokEngagerWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);

  const tiktokEngagerWebhookUseCase = makeTiktokEngagersWebhook();

  const data = await tiktokEngagerWebhookUseCase.execute({
    records,
  });

  reply.status(200).send(data);
};
