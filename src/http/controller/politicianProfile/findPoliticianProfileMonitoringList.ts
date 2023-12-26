import { makeFindPoliticianProfileMonitoringList } from "@/useCase/@factories/politicianProfileMonitoring/makeFindPoliticianProfileMonitoringList";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileMonitoringListController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const findPoliticianProfileMonitoringListUseCase =
      makeFindPoliticianProfileMonitoringList();
    const data = await findPoliticianProfileMonitoringListUseCase.execute({
      id: request.user.sub,
    });

    return reply.status(200).send(data);
  } catch (error) {
    throw error;
  }
};
