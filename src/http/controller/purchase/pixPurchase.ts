import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makePixPurchase } from "@/useCase/@factories/purchase/makePixPurchase";
import { FastifyReply, FastifyRequest } from "fastify";

export const pixPurchaseController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);

  try {
    const pixPurchaseUseCase = makePixPurchase();

    const payment = await pixPurchaseUseCase.execute({
      planId: id,
      userId: request.user.sub,
    });

    return reply.status(200).send({ payment });
  } catch (error) {
    throw error;
  }
};
