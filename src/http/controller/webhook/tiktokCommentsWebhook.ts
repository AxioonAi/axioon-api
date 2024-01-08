import { ZodWebhookBodySchema } from "@/lib/zod/global";
import { makeTiktokCommentsWebhook } from "@/useCase/@factories/webhook/makeTiktokCommentsWebhook";
import { FastifyReply, FastifyRequest } from "fastify";

export const tiktokCommentsWebhookController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { records } = ZodWebhookBodySchema.parse(request.body);

	try {
		const tiktokCommentsWebhookUseCase = makeTiktokCommentsWebhook();

		const data = await tiktokCommentsWebhookUseCase.execute({
			records,
		});

		return reply.status(200).send(data);
	} catch (error) {}
};
