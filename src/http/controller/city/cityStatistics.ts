import { ZodIdParamsSchema } from "@/lib/zod/global";
import { makeCityStatistics } from "@/useCase/@factories/city/makeCityStatistics";
import { FastifyReply, FastifyRequest } from "fastify";

export const cityStatisticsController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);

	try {
		const cityStatisticsUseCase = makeCityStatistics();

		const { city } = await cityStatisticsUseCase.execute({
			userId: id,
		});

		return reply.status(200).send({ city });
	} catch (error) {
		throw error;
	}
};
