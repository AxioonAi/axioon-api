import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianProfileInstagramDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileInstagramDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileInstagramDetailsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  const { startDate, endDate } =
    ZodFindPoliticianProfileDetailsQuerySchema.parse(request.query);
  try {
    const findPoliticianProfileInstagramDetails =
      makeFindPoliticianProfileInstagramDetails();
    const data = await findPoliticianProfileInstagramDetails.execute({
      id,
      startDate,
      endDate,
    });

    return reply.status(200).send(data);
  } catch (error) {
    throw error;
  }
};
