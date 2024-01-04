import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookCommentsWebhook } from "@/useCase/@factories/webhook/makeFacebookCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookCommentsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { Records } = ZodWebhookBodySchema.parse(request.body);

	try {
		const facebookCommentsWebhookUseCase = makeFacebookCommentsWebhook();

		const data = await facebookCommentsWebhookUseCase.execute({
			records: Records,
		});

		reply.status(200).send(data);
	} catch (error) {
		throw error;
	}
};
