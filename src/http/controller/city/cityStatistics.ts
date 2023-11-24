import { makeCityStatistics } from "@/useCase/@factories/city/makeCityStatistics";
import { FastifyReply, FastifyRequest } from "fastify";

export const cityStatisticsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const cityStatisticsUseCase = makeCityStatistics();
    console.log(request.user.sub);

    const { city } = await cityStatisticsUseCase.execute({
      userId: request.user.sub,
    });

    return reply.status(200).send({ city });
  } catch (error) {
    throw error;
  }
};
