import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianProfileSocialMediaHomeData } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileSocialMediaHomeData";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileSocialMediaHomeDataController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);
	const { period } = ZodFindPoliticianProfileDetailsQuerySchema.parse(
		request.query,
	);
	const findPoliticianProfileSocialMediaHomeDataUseCase =
		makeFindPoliticianProfileSocialMediaHomeData();

	const data = await findPoliticianProfileSocialMediaHomeDataUseCase.execute({
		id,
		period: 30,
	});

	return reply.status(200).send(data);
};
