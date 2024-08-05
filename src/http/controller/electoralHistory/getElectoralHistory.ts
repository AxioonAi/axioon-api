import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeGetElectoralHistory } from "@/useCase/@factories/electoralHistory/makeGetElectoralHistory";
import { FastifyReply, FastifyRequest } from "fastify";

export const getElectoralHistoryController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getElectoralHistoryUseCase = makeGetElectoralHistory();

  const { id } = ZodIdParamsSchema.parse(request.params);

  const electoralHistory = await getElectoralHistoryUseCase.execute({
    id,
  });

  return reply.status(200).send({ electoralHistory });
};
