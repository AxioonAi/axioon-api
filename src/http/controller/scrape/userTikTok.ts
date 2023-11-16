import { makePoliticianProfileTiktokList } from "@/useCase/@factories/politicianProfile/makePoliticianProfileTiktokList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userTikTokController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userTikTokUseCase = makePoliticianProfileTiktokList();

    const tiktok = await userTikTokUseCase.execute({});

    return reply.status(200).send(tiktok);
  } catch (error) {
    throw error;
  }
};
