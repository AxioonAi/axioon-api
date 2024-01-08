import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeFacebookAdsWebhook } from "@/useCase/@factories/webhook/makeFacebookAdsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const facebookAdsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	try {
		const facebookAdsWebhookUseCase = makeFacebookAdsWebhook();

		await facebookAdsWebhookUseCase.execute({
			records,
		});

		reply.status(200).send();
	} catch (error) {}
};
