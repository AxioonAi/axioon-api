import { makeUserPlanUsage } from "@/useCase/@factories/user/makeUserPlanUsage";
import { FastifyReply, FastifyRequest } from "fastify";

export const planUsageController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const planUsageUseCase = makeUserPlanUsage();

  const planUsage = await planUsageUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send(planUsage);
};
