import { makeYoutubeVideoWebhook } from "@/useCase/@factories/webhook/makeYoutubeVideoWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const youtubeVideoWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log("body:", request.body);
	console.log("bodyType:", typeof request.body);

	// const { message } = ZodWebhookBodySchema.parse(request.body);

	const Records = JSON.parse(request.body.Message);
	console.log(Records);

	try {
		const youtubeWebhookUseCase = makeYoutubeVideoWebhook();

		const data = await youtubeWebhookUseCase.execute({
			records: Records,
		});

		reply.status(200).send(data);
	} catch (error) {}
};
