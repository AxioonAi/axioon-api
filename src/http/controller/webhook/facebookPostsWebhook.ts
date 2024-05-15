import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookPostsWebhook } from "@/useCase/@factories/webhook/makeFacebookPostsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookPostsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { records } = ZodWebhookBodySchema.parse(request.body);

  console.log(records);
  const facebookPostsWebhookUseCase = makeFacebookPostsWebhook();

  const data = await facebookPostsWebhookUseCase.execute({
    records,
  });

  reply.status(200).send(data);
};
