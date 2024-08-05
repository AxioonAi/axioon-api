import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeRemoveProfileMonitoring } from "@/useCase/@factories/politicianProfileMonitoring/makeRemoveProfileMonitoring";
import { FastifyReply, FastifyRequest } from "fastify";

export const removeProfileMonitoringController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);

  const removeProfileMonitoringUseCase = makeRemoveProfileMonitoring();

  await removeProfileMonitoringUseCase.execute({
    profileId: id,
    userId: request.user.sub,
  });

  return reply.status(200).send();
};
