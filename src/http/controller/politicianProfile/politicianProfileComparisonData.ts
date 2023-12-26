import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makePoliticianProfileComparisonData } from "@/useCase/@factories/politicianProfile/makePoliticianProfileComparisonData";
import { FastifyReply, FastifyRequest } from "fastify";

export const politicianProfileComparisonDataController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  const { period } = ZodFindPoliticianProfileDetailsQuerySchema.parse(
    request.query
  );
  try {
    const findPoliticianProfileComparisonDataUseCase =
      makePoliticianProfileComparisonData();

    const data = await findPoliticianProfileComparisonDataUseCase.execute({
      id,
      period,
    });

    return reply.status(200).send(data);
  } catch (error) {
    throw error;
  }
};
