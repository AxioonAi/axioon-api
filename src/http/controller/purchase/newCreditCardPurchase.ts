import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodNewCreditCardPaymentBodySchema } from "@/lib/zod/purchase";
import { makeNewCreditCardPayment } from "@/useCase/@factories/purchase/makeNewCreditCardPayment";
import { FastifyReply, FastifyRequest } from "fastify";

export const newCreditCardPurchaseController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const data = ZodNewCreditCardPaymentBodySchema.parse(request.body);
	const { id } = ZodIdParamsSchema.parse(request.params);
	try {
		const newCreditCardPurchaseUseCase = makeNewCreditCardPayment();

		const payment = await newCreditCardPurchaseUseCase.execute({
			planId: id,
			...data,
			userId: request.user.sub,
		});

		return reply.status(200).send({ payment });
	} catch (error) {}
};
