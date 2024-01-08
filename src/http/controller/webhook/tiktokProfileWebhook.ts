import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeTiktokProfileWebhook } from "@/useCase/@factories/webhook/makeTiktokProfileWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const tiktokProfileWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);
	try {
		const tiktokProfileWebhookUseCase = makeTiktokProfileWebhook();

		const data = await tiktokProfileWebhookUseCase.execute({
			records,
		});

		reply.status(200).send(data);
	} catch (error) {}
};
