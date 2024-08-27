import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookAdsWebhook } from "@/useCase/@factories/webhook/makeFacebookAdsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookAdsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);
  console.log("entrou facebook ads webhook");
  try {
    const facebookAdsWebhookUseCase = makeFacebookAdsWebhook();

    await facebookAdsWebhookUseCase.execute({
      records,
    });

    console.log("saiu facebook ads webhook");
    reply.status(200).send();
  } catch (error) {}
};
