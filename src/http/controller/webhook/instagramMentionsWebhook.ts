import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramMentionsWebhook } from "@/useCase/@factories/webhook/makeInstagramMentionsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramMentionsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	const instagramMentionsWebhookUseCase = makeInstagramMentionsWebhook();

	const data = await instagramMentionsWebhookUseCase.execute({
		records,
	});

	reply.status(200).send(data);
};
