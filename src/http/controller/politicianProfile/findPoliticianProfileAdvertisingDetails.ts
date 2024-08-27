import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianProfileAdvertisingDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileAdvertisingDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileAdvertisingDetailsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  console.log("entrou");
  const { id } = ZodIdParamsSchema.parse(request.params);
  console.log("id");
  const { startDate, endDate } =
    ZodFindPoliticianProfileDetailsQuerySchema.parse(request.query);
  console.log("query", startDate, endDate);
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
