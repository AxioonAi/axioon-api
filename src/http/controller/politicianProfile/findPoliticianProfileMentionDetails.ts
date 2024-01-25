import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianProfileMentionsDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileMentionsDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileMentionDetailsController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);
	const { period } = ZodFindPoliticianProfileDetailsQuerySchema.parse(
		request.query,
	);
	const findPoliticianProfileMentionDetailsUseCase =
		makeFindPoliticianProfileMentionsDetails();

	const data = await findPoliticianProfileMentionDetailsUseCase.execute({
		id,
		period: Number(period),
	});

	return reply.status(200).send(data);
};
