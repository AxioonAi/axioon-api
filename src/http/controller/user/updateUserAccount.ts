import { ZodUpdateUserAccountBodySchema } from "@/lib/zod/user";
import { makeUpdateUserAccount } from "@/useCase/@factories/user/makeUpdateUserAccount";
import { FastifyReply, FastifyRequest } from "fastify";

export const updateUserAccountController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const data = ZodUpdateUserAccountBodySchema.parse(request.body);

	try {
		const updateUserAccountUseCase = makeUpdateUserAccount();

		await updateUserAccountUseCase.execute({
			data,
			id: request.user.sub,
		});
	} catch (error) {
		throw error;
	}
};
