import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramMentionsCommentsWebhook } from "@/useCase/@factories/webhook/makeInstagramMentionsCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramMentionCommentsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	console.log(records);

	const instagramMentionCommentsWebhookUseCase =
		makeInstagramMentionsCommentsWebhook();

	const data = await instagramMentionCommentsWebhookUseCase.execute({
		records,
	});

	return reply.status(200).send(data);
};
