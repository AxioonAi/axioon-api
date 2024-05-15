import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeTiktokProfileWebhook } from "@/useCase/@factories/webhook/makeTiktokProfileWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const tiktokProfileWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);
  try {
    console.log("entrou tiktok profile");
    const tiktokProfileWebhookUseCase = makeTiktokProfileWebhook();

    const data = await tiktokProfileWebhookUseCase.execute({
      records,
    });

    console.log("saiu tiktok profile");
    reply.status(200).send(data);
  } catch (error) {
    console.log("erro tiktok profile", error);
    console.log("erro tiktok profile");
  }
};
