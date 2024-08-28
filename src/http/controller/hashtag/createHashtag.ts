import { ZodCreateHashtagBodySchema } from "@/lib/zod/hashtag";
import { makeCreateHashtag } from "@/useCase/@factories/hashtag/makeCreateHashtag";
import { FastifyReply, FastifyRequest } from "fastify";

export const createHashtagController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = ZodCreateHashtagBodySchema.parse(request.body);

  const createHashtagUseCase = makeCreateHashtag();

  await createHashtagUseCase.execute({
    hashtags: data.hashtag,
    userId: request.user.sub,
  });

  return reply.status(201).send({});
};
