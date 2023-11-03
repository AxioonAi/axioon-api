import { ZodNewsWebhookBodySchema } from "@/lib/zod/news";
import { makeCreateNews } from "@/useCase/@factories/news/makeCreateNews";
import { FastifyReply, FastifyRequest } from "fastify";

export const newsWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { Records } = ZodNewsWebhookBodySchema.parse(request.body);
  try {
    const createNewsUseCase = makeCreateNews();

    const { news } = await createNewsUseCase.execute({
      records: Records,
    });

    reply.status(200).send("ok");
  } catch (error) {
    throw error;
  }
};
