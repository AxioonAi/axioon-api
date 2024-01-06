import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeYoutubeVideoWebhook } from "@/useCase/@factories/webhook/makeYoutubeVideoWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const youtubeVideoWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log(request.body);

	const { message } = ZodWebhookBodySchema.parse(request.body);

	const Records = JSON.parse(message);

	try {
		const youtubeWebhookUseCase = makeYoutubeVideoWebhook();

		const data = await youtubeWebhookUseCase.execute({
			records: Records,
		});

		reply.status(200).send(data);
	} catch (error) {}
};
