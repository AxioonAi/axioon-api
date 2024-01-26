import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeCreatePoliticianProfileMonitoring } from "@/useCase/@factories/politicianProfileMonitoring/makeCreatePoliticianProfileMonitoring";
import { FastifyReply, FastifyRequest } from "fastify";

export const createPoliticianProfileMonitoringController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);

	const createPoliticianProfileMonitoringUseCase =
		makeCreatePoliticianProfileMonitoring();

	await createPoliticianProfileMonitoringUseCase.execute({
		profileId: id,
		userId: request.user.sub,
	});

	return reply.status(201).send();
};
