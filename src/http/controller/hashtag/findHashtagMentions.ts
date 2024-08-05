import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindHashtagMentions } from "@/useCase/@factories/hashtag/makeFindHashtagMentions";
import { FastifyReply, FastifyRequest } from "fastify";

export const findHashtagMentionsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { startDate, endDate } =
    ZodFindPoliticianProfileDetailsQuerySchema.parse(request.params);

  const findHashtagMentionsUseCase = makeFindHashtagMentions();

  const data = await findHashtagMentionsUseCase.execute({
    userId: request.user.sub,
    startDate,
    endDate,
  });

  return reply.status(200).send(data);
};
