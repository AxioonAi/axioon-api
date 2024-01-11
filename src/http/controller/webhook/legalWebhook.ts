import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeLegalWebhook } from "@/useCase/@factories/webhook/makeLegalWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const legalWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	const legalWebhookUseCase = makeLegalWebhook();

	const data = await legalWebhookUseCase.execute({
		records,
	});

	reply.status(200).send(data);
};
