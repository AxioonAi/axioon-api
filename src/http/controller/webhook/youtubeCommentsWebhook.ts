import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeYoutubeCommentsWebhook } from "@/useCase/@factories/webhook/makeYoutubeCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const youtubeCommentsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log(request.body);
	const { Records } = ZodWebhookBodySchema.parse(request.body);

	const youtubeCommentsWebhookUseCase = makeYoutubeCommentsWebhook();

	const data = await youtubeCommentsWebhookUseCase.execute({
		records: Records,
	});

	reply.status(200).send(data);
};
