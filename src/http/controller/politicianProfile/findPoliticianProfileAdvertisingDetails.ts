import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianProfileAdvertisingDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileAdvertisingDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileAdvertisingDetailsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  const { startDate, endDate } =
    ZodFindPoliticianProfileDetailsQuerySchema.parse(request.query);

  const findPoliticianProfileAdvertisingDetailsUseCase =
    makeFindPoliticianProfileAdvertisingDetails();

  const data = await findPoliticianProfileAdvertisingDetailsUseCase.execute({
    id,
    userId: request.user.sub,
    endDate,
    startDate,
  });

  return reply.status(200).send(data);
};
