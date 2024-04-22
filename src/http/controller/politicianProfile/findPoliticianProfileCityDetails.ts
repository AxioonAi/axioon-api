import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeFindPoliticianProfileCityDetails } from "@/useCase/@factories/politicianProfile/makeCityStatistics";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileCityDetailsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  const findPoliticianProfileCityDetailsUseCase =
    makeFindPoliticianProfileCityDetails();

  const { city } = await findPoliticianProfileCityDetailsUseCase.execute({
    id,
    userId: request.user.sub,
  });

  return reply.status(200).send({ city });
};
