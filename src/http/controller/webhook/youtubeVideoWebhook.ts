import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeYoutubeVideoWebhook } from "@/useCase/@factories/webhook/makeYoutubeVideoWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const youtubeVideoWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);
	try {
		const youtubeWebhookUseCase = makeYoutubeVideoWebhook();

		const data = await youtubeWebhookUseCase.execute({
			records,
		});

		reply.status(200).send(data);
	} catch (error) {}
};
