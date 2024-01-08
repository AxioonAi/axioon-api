import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeNewsWebhook } from "@/useCase/@factories/webhook/makeNewsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const newsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	const newsWebhookUseCase = makeNewsWebhook();
	const data = await newsWebhookUseCase.execute({
		records,
	});

	reply.status(200).send(data);
};
