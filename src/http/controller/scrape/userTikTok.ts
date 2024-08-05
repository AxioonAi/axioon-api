import { makePoliticianProfileTiktokList } from "@/useCase/@factories/scrape/makePoliticianProfileTiktokList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userTikTokController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userTikTokUseCase = makePoliticianProfileTiktokList();

  const tiktok = await userTikTokUseCase.execute();

  return reply.status(200).send(tiktok);
};
