import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianProfileFacebookDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileFacebookDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileFacebookDetailsController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);
	const { period } = ZodFindPoliticianProfileDetailsQuerySchema.parse(
		request.query,
	);
	const findPoliticianProfileFacebookDetailsUseCase =
		makeFindPoliticianProfileFacebookDetails();

	const data = await findPoliticianProfileFacebookDetailsUseCase.execute({
		id,
		period,
	});

	return reply.send(data);
};
