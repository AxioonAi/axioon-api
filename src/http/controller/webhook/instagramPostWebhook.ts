import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramPostWebhook } from "@/useCase/@factories/webhook/makeInstagramPostWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramPostWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { Records } = ZodWebhookBodySchema.parse(request.body);

	try {
		const instagramPostWebhookUseCase = makeInstagramPostWebhook();

		const data = await instagramPostWebhookUseCase.execute({
			records: Records,
		});

		reply.status(200).send(data);
	} catch (error) {
		throw error;
	}
};
