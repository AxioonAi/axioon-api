import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramMentionsCommentsWebhook } from "@/useCase/@factories/webhook/makeInstagramMentionsCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramMentionCommentsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { Records } = ZodWebhookBodySchema.parse(request.body);

	try {
		const instagramMentionCommentsWebhookUseCase =
			makeInstagramMentionsCommentsWebhook();

		const data = await instagramMentionCommentsWebhookUseCase.execute({
			records: Records,
		});

		return reply.status(200).send(data);
	} catch (error) {}
};
