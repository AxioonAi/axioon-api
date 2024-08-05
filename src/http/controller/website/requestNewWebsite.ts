import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodRequestWebsiteBodySchema } from "@/lib/zod/website";
import { makeRequestNewWebsite } from "@/useCase/@factories/website/makeRequestNewWebsite";
import { FastifyReply, FastifyRequest } from "fastify";

export const requestNewWebsiteController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestNewWebsiteUseCase = makeRequestNewWebsite();
  const website = ZodRequestWebsiteBodySchema.parse(request.body);

  await requestNewWebsiteUseCase.execute({
    website_url: website.url,
  });

  return reply.status(201).send();
};
