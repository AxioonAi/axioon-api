import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianProfileFacebookDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileFacebookDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileFacebookDetailsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  const { startDate, endDate } =
    ZodFindPoliticianProfileDetailsQuerySchema.parse(request.query);
  try {
    const findPoliticianProfileFacebookDetailsUseCase =
      makeFindPoliticianProfileFacebookDetails();

    const data = await findPoliticianProfileFacebookDetailsUseCase.execute({
      id,
      startDate,
      endDate,
    });

    return reply.send(data);
  } catch (error) {
    throw error;
  }
};