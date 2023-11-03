import { makeUserNewsList } from "@/useCase/@factories/news/makeUserNewsList";
import { FastifyReply, FastifyRequest } from "fastify";

export const userNewsListController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const UserNewsList = makeUserNewsList();

    const { news } = await UserNewsList.execute({
      userId: request.user.sub,
    });

    return reply.status(200).send(news);
  } catch (error) {
    throw error;
  }
};
