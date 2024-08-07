// import { ZodIdParamsSchema } from "@/lib/zod/global";
// import { ZodFindPoliticianProfileDetailsQuerySchema } from "@/lib/zod/politicianProfile";
// import { makeFindPoliticianProfileInstagramDetails } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileInstagramDetails";
// import { FastifyReply, FastifyRequest } from "fastify";

// export const findPoliticianProfileInstagramDetailsController = async (
// 	request: FastifyRequest,
// 	reply: FastifyReply,
// ) => {
// 	const { id } = ZodIdParamsSchema.parse(request.params);
// 	const { period } = ZodFindPoliticianProfileDetailsQuerySchema.parse(
// 		request.query,
// 	);
// 	const findPoliticianProfileInstagramDetails =
// 		makeFindPoliticianProfileInstagramDetails();
// 	const data = await findPoliticianProfileInstagramDetails.execute({
// 		id,
// 		period,
// 	});

// 	return reply.status(200).send(data);
// };
