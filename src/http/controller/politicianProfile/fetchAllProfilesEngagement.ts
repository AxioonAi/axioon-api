import { makeFetchAllProfilesEngagement } from "@/useCase/@factories/politicianProfile/makeFetchAllProfilesEngagement";
import { FastifyReply, FastifyRequest } from "fastify";

export const fetchAllProfilesEngagementController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const fetchAllProfilesEngagementUseCase = makeFetchAllProfilesEngagement();

  const data = await fetchAllProfilesEngagementUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send(data);
};
