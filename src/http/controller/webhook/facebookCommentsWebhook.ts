import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookCommentsWebhook } from "@/useCase/@factories/webhook/makeFacebookCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookCommentsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	const facebookCommentsWebhookUseCase = makeFacebookCommentsWebhook();

	const data = await facebookCommentsWebhookUseCase.execute({
		records,
	});

	reply.status(200).send(data);
};
