import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeInstagramPostWebhook } from "@/useCase/@factories/webhook/makeInstagramPostWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const instagramPostWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	try {
		const instagramPostWebhookUseCase = makeInstagramPostWebhook();

		const data = await instagramPostWebhookUseCase.execute({
			records,
		});

		reply.status(200).send(data);
	} catch (error) {}
};
