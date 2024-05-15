import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramProfileWebhook } from "@/useCase/@factories/webhook/makeInstagramProfileWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramProfileWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);

  console.log("entrou insta perfil");
  try {
    const instagramProfileWebhookUseCase = makeInstagramProfileWebhook();

    const data = await instagramProfileWebhookUseCase.execute({
      records,
    });
    console.log("saiu insta perfil");

    reply.status(200).send(data);
  } catch (error) {}
};
