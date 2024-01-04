import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramProfileWebhook } from "@/useCase/@factories/webhook/makeInstagramProfileWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramProfileWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { Records } = ZodWebhookBodySchema.parse(request.body);

	try {
		const instagramProfileWebhookUseCase = makeInstagramProfileWebhook();

		const data = await instagramProfileWebhookUseCase.execute({
			records: Records,
		});

		reply.status(200).send(data);
	} catch (error) {
		throw error;
	}
};
