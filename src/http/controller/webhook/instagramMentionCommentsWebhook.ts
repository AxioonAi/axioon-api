import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramMentionsCommentsWebhook } from "@/useCase/@factories/webhook/makeInstagramMentionsCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramMentionCommentsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log(request.body);
	const { Records } = ZodWebhookBodySchema.parse(request.body);

	const instagramMentionCommentsWebhookUseCase =
		makeInstagramMentionsCommentsWebhook();

	const data = await instagramMentionCommentsWebhookUseCase.execute({
		records: Records,
	});

	return reply.status(200).send(data);
};
