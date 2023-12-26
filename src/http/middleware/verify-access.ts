import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeVerifyPoliticianProfileMonitoringExists } from "@/useCase/@factories/politicianProfileMonitoring/makeVerifyPoliticianProfileMonitoringExists";
import { FastifyReply, FastifyRequest } from "fastify";

export const verifyAccessMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);

  try {
    const verifyAccess = makeVerifyPoliticianProfileMonitoringExists();

    const exists = await verifyAccess.execute({
      profileId: id,
      id: request.user.sub,
    });

    return;
  } catch (error) {
    throw error;
  }
};
