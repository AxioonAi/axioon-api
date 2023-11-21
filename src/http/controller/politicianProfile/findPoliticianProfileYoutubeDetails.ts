import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianYoutubeDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianYoutubeDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileYoutubeDetailsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  const { startDate, endDate } =
    ZodFindPoliticianProfileDetailsQuerySchema.parse(request.query);
  try {
    const findPoliticianProfileYoutubeDetailsUseCase =
      makeFindPoliticianYoutubeDetails();

    const data = await findPoliticianProfileYoutubeDetailsUseCase.execute({
      id,
      startDate,
      endDate,
    });

    return reply.status(200).send(data);
  } catch (error) {
    throw error;
  }
};
