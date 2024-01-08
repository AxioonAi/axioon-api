import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeYoutubeChannelWebhook } from "@/useCase/@factories/webhook/makeYoutubeChannelWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const youtubeChannelWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	try {
		const youtubeChannelWebhookUseCase = makeYoutubeChannelWebhook();

		const data = await youtubeChannelWebhookUseCase.execute({
			records,
		});

		reply.status(200).send(data);
	} catch (error) {}
};
