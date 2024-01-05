import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianProfileTiktokDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileTiktokDetails";
import { FastifyReply, FastifyRequest } from "fastify";

export const findPoliticianProfileTiktokDetailsController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = ZodIdParamsSchema.parse(request.params);
	const { period } = ZodFindPoliticianProfileDetailsQuerySchema.parse(
		request.query,
	);

	const findPoliticianProfileTiktokDetails =
		makeFindPoliticianProfileTiktokDetails();

	const data = await findPoliticianProfileTiktokDetails.execute({
		id,
		period,
	});

	return reply.send(data);
};
