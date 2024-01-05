import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookPostsWebhook } from "@/useCase/@factories/webhook/makeFacebookPostsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookPostsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { Records } = ZodWebhookBodySchema.parse(request.body);
	const facebookPostsWebhookUseCase = makeFacebookPostsWebhook();

	const data = await facebookPostsWebhookUseCase.execute({
		records: Records,
	});

	reply.status(200).send(data);
};
