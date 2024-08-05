import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeGetProfileElectoralYears } from "@/useCase/@factories/electoralHistory/makeGetProfileElectoralYears";
import { FastifyReply, FastifyRequest } from "fastify";

export const getProfileElectoralYearsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  const getProfileElectoralYearsUseCase = makeGetProfileElectoralYears();

  const electoralYears = await getProfileElectoralYearsUseCase.execute({
    profileId: id,
  });

  return reply.status(200).send({ electoralYears });
};
