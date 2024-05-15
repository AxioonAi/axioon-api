import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeYoutubeCommentsWebhook } from "@/useCase/@factories/webhook/makeYoutubeCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const youtubeCommentsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);

  console.log("entrou youtube comments");
  const youtubeCommentsWebhookUseCase = makeYoutubeCommentsWebhook();

  const data = await youtubeCommentsWebhookUseCase.execute({
    records,
  });

  console.log("saiu youtube comments");
  reply.status(200).send(data);
};
